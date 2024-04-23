import {
  ConflictException,
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

  // 토큰 유효성 검증
  async verifyToken(token: string, secretKey: string) {
    try {
      const decodedToken = await this.jwtService.verify(token, {
        secret: secretKey,
      });
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // 토큰 기한이 만료되었는지
  async isTokenExpired(token: string) {
    const decodedToken = await this.jwtService.decode(token);
    const expirationTime = new Date(decodedToken.exp * 1000);
    const currentTime = new Date();

    return expirationTime < currentTime;
  }

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

  // 토큰값으로 유저 정보 가져오기
  async getTokenUser(token: string): Promise<User> {
    const decodedToken = await this.jwtService.verify(token, {
      secret: 'Secret1234',
    });
    if (!decodedToken) {
      throw new UnauthorizedException();
    }
    const user = await this.emailUser(decodedToken.email);

    return user;
  }

  // 토큰 최종 유효성 검증
  async checkingToken(token: string, secretKey: string) {
    try {
      // JWT 토큰을 검증하고 디코딩합니다
      const decodedToken = await this.verifyToken(token, 'Secret1234');
      // 토큰이 유효한 경우, 만료 여부를 확인합니다
      const isExpired = await this.isTokenExpired(token);
      const user = await this.getTokenUser(token);
      if (!isExpired) {
        return user;
      } else {
        throw new UnauthorizedException('만료됨');
      }
    } catch (error) {
      console.log('Error', error);
      throw new UnauthorizedException('검증 도중 에러 발생');
    }
  }

  // 회원가입
  async signUp(data: signUpDto): Promise<User | String> {
    const { email, password, firstName, lastName } = data;
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
    const { email, password } = signInDto;
    const user = await this.emailUser(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const payload = { email };
      const access_token = this.jwtService.sign(payload);
      return access_token;
    } else {
      if (user.email !== email || !isMatch) {
        throw new Error('Login failed');
      }
    }
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
    console.log(data);

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

    const result = await this.emailUser(user.email);

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
  async getProductsWhileUpdate(checklist: number[]): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { id: { in: checklist } },
      include: { images: true },
    });

    return products;
  }

  // 선택된 상품 제거하기(판매 취소 버튼)
  async deleteProduct(user: User, data: ProductStatus) {
    const product_ids = [];
    console.log('data: ', data);
    for (const key in data) {
      if (data[key]) {
        product_ids.push(Number(key));
      }
    }
    await this.prisma.userProduct.deleteMany({
      where: { productId: { in: product_ids } },
    });
    await this.prisma.productImage.deleteMany({
      where: { productId: { in: product_ids } },
    });

    await this.prisma.product.deleteMany({
      where: { id: { in: product_ids } },
    });

    const result = await this.prisma.sellingList.findUnique({
      where: { userId: user.id },
      include: { products: { include: { images: true, likedBy: true } } },
    });

    return result;
  }
}
