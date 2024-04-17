import { Injectable } from '@nestjs/common';
import { Product, SellingList, User, ViewedProduct } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import ProductDetailDto from 'src/user/dto/addProduct.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: Product): Promise<Product> {
    const result = await this.prisma.product.create({ data });

    return result;
  }

  async getProduct(id: number): Promise<Product> {
    const result = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true, reviews: true, likedBy: true },
    });
    return result;
  }

  async getProducts(): Promise<Product[]> {
    const result = await this.prisma.product.findMany({});
    return result;
  }

  async getCategoryItems(user: User, category: string, limit: number) {
    const result = await this.prisma.product.findMany({
      where: {
        sellingListId: user.sellinglistId,
        AND: { category_name: category },
      },
      include: { images: true },
    });

    const totalPages = Math.ceil(result.length / limit);

    const data = {
      result,
      totalPages,
    };

    return data;
  }

  async getAllProducts(category: string): Promise<Product[]> {
    const result = await this.prisma.product.findMany({
      where: { category_name: category },
      include: { images: true, likedBy: true },
    });

    return result;
  }

  async getProductByName(keyword: string): Promise<Product | Product[]> {
    const found = await this.prisma.product.findMany({
      where: { name: { contains: keyword } },
      include: { images: true },
    });

    if (!found) {
      return [];
    }

    return found;
  }

  // 현재 상품 상세 정보 페이지에 올라와있는 상품이 현재 사용자가 올렸던 상품인지
  async isUsersProduct(user: User, productId: number): Promise<Boolean> {
    const found = await this.prisma.sellingList.findFirst({
      where: { userId: user.id, products: { some: { id: productId } } },
    });

    if (!found) return false;

    return true;
  }

  async guestWatchedProduct(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    await this.prisma.product.update({
      where: { id: productId },
      data: { viewed_count: product.viewed_count + 1 },
    });
  }

  async userWatchedProduct(
    user: User,
    productId: number,
  ): Promise<ViewedProduct[]> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    const viewed_product = await this.prisma.viewedProduct.findUnique({
      where: { userId: user.id },
    });

    if (!product) {
      throw new Error('상품이 존재하지 않습니다');
    }

    if (!viewed_product) {
      await this.prisma.viewedProduct.create({
        data: { userId: user.id },
      });
    }

    await this.prisma.product.update({
      where: { id: product.id },
      data: { viewed_count: product.viewed_count + 1 },
    });

    await this.prisma.viewedProduct.update({
      where: { userId: user.id },
      data: { products: { connect: { id: productId } } },
    });

    const viewedproduct = await this.prisma.viewedProduct.findMany({
      where: { userId: user.id },
    });

    return viewedproduct;
  }

  async deleteProduct(id: number): Promise<Product> {
    const result = await this.prisma.product.delete({ where: { id } });
    return result;
  }

  async getDiscountingProducts(): Promise<Product[]> {
    const discounting_products = await this.prisma.product.findMany({
      where: { isDiscounting: { equals: true } },
      include: { images: true },
    });

    return discounting_products;
  }

  async getProductsByPage(user: User, page: number, limit: number) {
    const sellinglist = await this.prisma.sellingList.findUnique({
      where: { userId: user.id },
      include: { products: true },
    });

    const totalPages = Math.ceil(sellinglist.products.length / limit);
    const skip = (page - 1) * limit;

    const products = await this.prisma.product.findMany({
      where: { SellingList: { userId: user.id } },
      take: limit,
      skip,
      orderBy: {
        id: 'asc',
      },
      include: { images: true },
    });

    const data = {
      totalPages,
      products,
    };

    return data;
  }

  async getProductsBySearchKeyword(
    keyword: string,
  ): Promise<Product | Product[]> {
    const results = await this.prisma.product.findMany({
      where: { name: { contains: keyword } },
      include: { images: true, likedBy: true },
    });

    return results;
  }

  async getRecommend(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({});
    const max_length = products.length;
    const min_length = 1;
    const numbers = [];
    if (max_length > 0) {
      for (let i = 0; i < max_length; i++) {
        const random_id =
          Math.floor(Math.random() * (max_length - min_length + 1)) +
          min_length;
        numbers.push(random_id);
      }
    }

    const result = await this.prisma.product.findMany({
      where: { id: { in: numbers } },
      include: { images: true },
    });
    return result;
  }

  // 판매 상품 등록하기
  async addProduct(
    user: User,
    productDetailDto: ProductDetailDto,
  ): Promise<SellingList> {
    const {
      image,
      image_size,
      name,
      detail,
      price,
      manufacturer,
      category,
      inventory,
      status,
      seller,
      discountPrice,
      discountRatio,
      isDiscounting,
    } = productDetailDto;
    const detail2 = detail.trim();
    const priceWithoutComma = price.replace(/,/g, '');
    const parsedIntPrice = parseInt(priceWithoutComma, 10);
    const parsedDiscountPrice = parseInt(discountPrice.replace(/,/g, ''));
    let product_category = null;
    let onsales = null;

    const finding_category = await this.prisma.category.findFirst({
      where: { name: category },
    });

    if (!finding_category) {
      product_category = await this.prisma.category.create({
        data: { name: category },
      });
    } else {
      product_category = finding_category;
    }

    const product_image = await this.prisma.image.create({
      data: { imgUrl: image, size: Number(image_size) },
    });

    const product = await this.prisma.product.create({
      data: {
        name,
        description: [detail2],
        price: Number(parsedIntPrice),
        manufacturer,
        status,
        seller,
        discountPrice: parsedDiscountPrice,
        isDiscounting: Boolean(isDiscounting),
        discountRatio: Number(discountRatio),
        category_name: category,
        inventory: Number(inventory),
        category: { connect: { id: product_category.id } },
        images: { connect: { id: product_image.id } },
      },
    });

    await this.prisma.productImage.create({
      data: { imageId: product_image.id, productId: product.id },
    });

    try {
      if (!user.sellinglistId) {
        if (!user.storeId) {
          onsales = await this.prisma.sellingList.create({
            data: {
              products: { connect: { id: product.id } },
              user: { connect: { id: user.id } },
            },
          });
        } else {
          onsales = await this.prisma.sellingList.create({
            data: {
              products: { connect: { id: product.id } },
              user: { connect: { id: user.id } },
              store: { connect: { id: user.storeId } },
            },
          });
        }
      } else {
        onsales = await this.prisma.sellingList.update({
          where: { userId: user.id },
          data: {
            storeId: user.storeId,
            userId: user.id,
            products: { connect: { id: product.id } },
          },
        });
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: { sellinglistId: onsales.id },
      });
    } catch (error) {
      console.log('sellingList 레코드 생성 실패', error);
    }

    const result = await this.prisma.sellingList.findUnique({
      where: { userId: user.id },
    });
    return result;
  }

  // 판매 중인 물품 정보 수정하기
  async updateProduct(
    user: User,
    id: number,
    updateProductDto: ProductDetailDto,
  ): Promise<SellingList> {
    const {
      name,
      price,
      detail,
      category,
      image,
      image_size,
      inventory,
      manufacturer,
      status,
      isDiscounting,
      discountPrice,
      discountRatio,
    } = updateProductDto;
    const priceWithoutComma = price.replace(/,/g, '');
    const parsedDiscountPrice = parseInt(discountPrice.replace(/,/g, ''));
    const parsedIntPrice = parseInt(priceWithoutComma, 10);
    const product_image = await this.prisma.productImage.findFirst({
      where: { productId: Number(id) },
    });

    await this.prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price: parsedIntPrice,
        status,
        description: [detail],
        category_name: category,
        inventory: Number(inventory),
        manufacturer,
        discountPrice: parsedDiscountPrice,
        discountRatio: Number(discountRatio),
        isDiscounting: Boolean(isDiscounting),
        images: {
          update: {
            where: { id: product_image.imageId },
            data: { imgUrl: image, size: Number(image_size) },
          },
        },
      },
    });

    const result = await this.prisma.sellingList.findUnique({
      where: { userId: user.id },
    });
    return result;
  }
}
