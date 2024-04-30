import { Injectable } from '@nestjs/common';
import { Product, User, UserProduct } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { LikeState } from './like.interface';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async getUserLikes(user: User): Promise<Product | Product[]> {
    const result = this.prisma.userProduct.findMany({
      where: { userId: user.id },
    });
    const product_idices = (await result).map((val) => val.productId);

    const products = await this.prisma.product.findMany({
      where: { id: { in: product_idices } },
      include: { images: true, likedBy: true },
    });

    return products;
  }

  async getUserLikesByCategory(
    user: User,
    category: string,
  ): Promise<Product | Product[]> {
    const result = this.prisma.userProduct.findMany({
      where: { userId: user.id },
    });
    const product_idices = (await result).map((val) => val.productId);

    const products = await this.prisma.product.findMany({
      where: { id: { in: product_idices }, category_name: category },
      include: { images: true, likedBy: true },
    });

    return products;
  }

  async updatelikeProduct(user: User, data: LikeState) {
    const products_states = { ...data };
    const checking = Object.keys(products_states).filter(
      (val) => products_states[val] === true,
    );

    if (!checking) return;

    const found = await this.prisma.wishList.findUnique({
      where: { userId: user.id },
    });

    if (!found) {
      await this.prisma.wishList.create({
        data: { userId: user.id },
      });
    }

    for (const [productId, liked] of Object.entries(products_states)) {
      const id = parseInt(productId);
      const found = await this.prisma.userProduct.findFirst({
        where: { productId: id, userId: user.id },
      });

      if (liked) {
        if (!found) {
          let userproduct = await this.prisma.userProduct.create({
            data: {
              userId: user.id,
              productId: id,
            },
          });
          await this.prisma.wishList.update({
            where: { userId: user.id },
            data: { products: { connect: { id } } },
          });
        }
      } else {
        if (!found) {
          continue;
        }
        await this.prisma.userProduct.delete({
          where: {
            userId_productId: {
              productId: id,
              userId: user.id,
            },
          },
        });
        await this.prisma.wishList.update({
          where: { userId: user.id },
          data: { products: { disconnect: { id } } },
        });
      }
    }

    if (Object.keys(products_states).length === 1) {
      const product = await this.prisma.product.findUnique({
        where: { id: Number(Object.keys(products_states)[0]) },
        include: { likedBy: true, images: true },
      });
      return product;
    }

    const result = await this.prisma.wishList.findUnique({
      where: { userId: user.id },
      include: { products: { include: { likedBy: true, images: true } } },
    });

    return result;
  }
}
