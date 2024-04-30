import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Category, Product, SellingList, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CategoryService {
  constructor(
    private prismaService: PrismaService,
    private productService: ProductService,
  ) {}

  async registerCategory(user: User, data: Category): Promise<Category> {
    if (user.role === 'ADMIN') {
      console.log('create category:', data);
      const result = await this.prismaService.category.create({
        data: { name: data.name, imgUrl: data.imgUrl },
      });
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }

  async getAllCategory(): Promise<Category[]> {
    const result = await this.prismaService.category.findMany();
    return result;
  }

  async getAllProducts(
    user: User,
    category: string,
  ): Promise<Product | Product[]> {
    const result = await this.prismaService.product.findMany({
      where: {
        sellingListId: user.sellinglistId,
        category_name: category,
        status: { not: '보류중' },
      },
      include: { images: true, likedBy: true },
    });

    return result;
  }

  async getAllSellingProducts(category: string): Promise<Product | Product[]> {
    if (category) {
      const result = await this.prismaService.product.findMany({
        where: { category_name: category, status: { not: '보류중' } },
        include: { images: true, likedBy: true },
      });

      return result;
    }
  }
}
