import { productIds, requireOwnedProducts } from '../security/security';
import {
  ConflictException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Product, Profile, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { signInDto, signUpDto } from './dto/sign.dto';
import { UserProfileDto } from './dto/user.dto';
import ProductDetailDto from './dto/addProduct.dto';
import { ProductStatus } from 'src/sellinglist/product.interface';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 이메일로 유저 정보 가져오기
  async emailUser(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: {
        sellinglist: {
          include: {
            products: {
              select: {
                id: true,
                category_name: true,
                status: true,
                price: true,
                name: true,
                images: true,
                manufacturer: true,
                description: true,
                isDiscounting: true,
                discountPrice: true,
                discountRatio: true,
              },
            },
            store: true,
          },
        },
        profile: true,
        orders: true,
        store: true,
        likedProducts: true,
        viewedProducts: true,
        wishlist: true,
        reviews: true,
      },
    });
    return user;
  }

  // 회원가입
  async signUp(data: signUpDto): Promise<User | String> {
    const { email, password, firstName, lastName } = data || {};
    if (
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      typeof password !== 'string' ||
      password.length < 12 ||
      Buffer.byteLength(password) > 72 ||
      [firstName, lastName].some(
        (value) =>
          typeof value !== 'string' || !value.trim() || value.length > 100,
      )
    )
      throw new BadRequestException(
        'Valid email, names and a 12-character password (at most 72 bytes) are required',
      );
    const hash = await bcrypt.hash(password, 10);

    const alreadyExist = await this.prisma.user.findUnique({
      where: { email },
    });

    if (alreadyExist) {
      throw new ConflictException('이미 존재하는 계정');
    }

    const signup_result = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        firstName,
        lastName,
        profile: {
          create: {},
        },
      },
      include: {
        reviews: true,
        orders: true,
        profile: true,
        store: true,
        wishlist: true,
      },
    });
    return signup_result;
  }

  // 로그인
  async signIn(signInDto: signInDto): Promise<String> {
    const { email, password } = signInDto || {};
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      Buffer.byteLength(password) > 72
    )
      throw new UnauthorizedException('Invalid credentials');
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Invalid credentials');
    return this.jwtService.sign({ sub: user.id, email: user.email });
  }

  // 유저 생성 id 값으로 유저 정보 가져오기
  async getUser(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // 모든 유저 정보 가져오기(관리자 권한)
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // 유저 정보 삭제하기(회원탈퇴)
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }

  // 유저 정보 모두 삭제하기
  async deleteAllUsers() {
    return this.prisma.user.deleteMany();
  }

  // 닉네임 변경
  async updateNickname(user: User, nickname: string): Promise<User> {
    await this.prisma.profile.update({
      where: { userId: user.id },
      data: { nickname },
    });
    const userinfo = await this.emailUser(user.email);

    return userinfo;
  }

  // 프로필 정보 수정
  async updateProfile(user: User, data: UserProfileDto) {
    const {
      email,
      address,
      store,
      nickname,
      phoneNumber,
      imgUrl,
      isPersonal,
      seller,
      currentAddr,
      userCurrentLocation,
    } = data;

    const filteredAddresses = address.filter((addr) => addr !== currentAddr);
    const updatedAddresses = [currentAddr, ...filteredAddresses];
    const uniqueAddresses = Array.from(new Set(updatedAddresses));

    if (isPersonal) {
      if (user.storeId !== null) {
        await this.prisma.store.update({
          where: { id: user.storeId },
          data: { users: { disconnect: { id: user.id } } },
        });
      }
    } else {
      const store_found = await this.prisma.store.findUnique({
        where: { name: store },
      });
      const users_store = await this.prisma.user.findFirst({
        where: { store: { name: store } },
      });

      if (store_found && store_found.id !== user.storeId)
        throw new ForbiddenException(
          'Joining another store requires administrator approval',
        );
      if (!store_found) {
        const created = await this.prisma.store.create({
          data: { name: store },
        });
        if (!users_store) {
          await this.prisma.store.update({
            where: { id: created.id },
            data: { users: { connect: { id: user.id } } },
          });
        } else {
          await this.prisma.user.update({
            where: { id: user.id },
            data: {
              store: {
                disconnect: { id: user.storeId },
                connect: { id: created.id },
              },
            },
          });
        }
      } else {
        if (user.storeId === null) {
          await this.prisma.store.update({
            where: { id: store_found.id },
            data: { users: { connect: { id: user.id } } },
          });
        } else {
          await this.prisma.user.update({
            where: { id: user.id },
            data: {
              store: {
                disconnect: { id: user.storeId },
                connect: { id: store_found.id },
              },
            },
          });
        }
      }
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { email, seller },
    });
    await this.prisma.profile.update({
      where: { userId: user.id },
      data: {
        nickname,
        address: { set: uniqueAddresses },
        phoneNumber,
        currentAddress: currentAddr, // 유저가 설정한 주소
        imageUrl: imgUrl,
        userCurrentLocation, // 유저 실제 위치
      },
    });

    const result = await this.emailUser(email);

    return result;
  }

  // 프로필 이미지 업로드
  async uploadProfileImage(user: User, imgUrl: string, img_size: number) {
    const image = await this.prisma.image.create({
      data: { imgUrl, size: img_size },
    });
    await this.prisma.profile.update({
      where: { userId: user.id },
      data: { imageUrl: imgUrl, imageId: image.id },
    });

    const result = await this.emailUser(user.email);

    return result;
  }

  // 프로필 가져오기
  async getProfile(user: User): Promise<Profile> {
    return this.prisma.profile.findUnique({ where: { userId: user.id } });
  }

  // 모든 프로필 정보 가져오기
  async getAllProfile(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  // 프로필 삭제하기
  async deleteProfile(id: number): Promise<Profile> {
    return this.prisma.profile.delete({ where: { id: id } });
  }

  // 업데이트 버튼 클릭 시 체크된 상품 정보들에 대한 레코드 불러오기
  async getProductsWhileUpdate(
    user: User,
    checklist: number[],
  ): Promise<Product[]> {
    if (checklist.length > 100) throw new BadRequestException();
    await requireOwnedProducts(this.prisma, user.id, checklist);
    const products = await this.prisma.product.findMany({
      where: { id: { in: checklist }, SellingList: { userId: user.id } },
      include: { images: true },
    });

    return products;
  }

  // 선택된 상품 제거하기(판매 취소 버튼)
  async deleteProduct(user: User, data: ProductStatus) {
    const product_ids = productIds(data, true);
    await this.prisma.$transaction(async (tx) => {
      await requireOwnedProducts(tx, user.id, product_ids);
      await tx.userProduct.deleteMany({
        where: {
          productId: { in: product_ids },
          product: { SellingList: { userId: user.id } },
        },
      });
      await tx.productImage.deleteMany({
        where: {
          productId: { in: product_ids },
          product: { SellingList: { userId: user.id } },
        },
      });
      await tx.product.deleteMany({
        where: { id: { in: product_ids }, SellingList: { userId: user.id } },
      });
    });

    const result = await this.prisma.sellingList.findUnique({
      where: { userId: user.id },
      include: { products: { include: { images: true, likedBy: true } } },
    });

    return result;
  }
}
