import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Category, Product, User } from '@prisma/client';
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

  async getAllProducts(category: string): Promise<Product[]> {
    const result = await this.productService.getAllProducts(category);

    return result;
  }
}
