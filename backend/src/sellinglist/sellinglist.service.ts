import { Injectable } from '@nestjs/common';
import { Product, SellingList, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateDto } from './dto/update.dto';
import { ProductStatus } from './product.interface';

@Injectable()
export class SellinglistService {
  constructor(private prisma: PrismaService) {}

  async getSellinglist(user: User, limit: number) {
    const sellinglist = await this.prisma.sellingList.findUnique({
      where: { userId: user.id },
      include: {
        products: { include: { images: true }, orderBy: { id: 'asc' } },
      },
    });
    const totalPages = Math.ceil(sellinglist.products.length / limit);

    const data = {
      sellinglist,
      totalPages,
    };

    return data;
  }

  async updateProductStatus(
    user: User,
    data: ProductStatus,
  ): Promise<SellingList> {
    const updatePromise = Object.entries(data).map(([key, value]) => {
      const productId = Number(key);
      const status = value ? '판매중' : '보류중';
      return this.prisma.product.update({
        where: { id: productId },
        data: { status },
      });
    });
    await Promise.all(updatePromise);
    const sellingList = await this.prisma.sellingList.findUnique({
      where: { userId: user.id },
      include: {
        products: {
          include: { images: true, likedBy: true },
          orderBy: { id: 'asc' },
        },
      },
    });
    return sellingList;
  }

  async getProductByKeyword(
    user: User,
    data: string,
  ): Promise<Product | Product[]> {
    if (user.sellinglistId) {
      const products = await this.prisma.product.findMany({
        where: { sellingListId: user.sellinglistId, name: { contains: data } },
        include: { images: true, likedBy: true },
      });
      return products;
    } else {
      return;
    }
  }
}
