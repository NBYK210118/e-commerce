import { Injectable } from '@nestjs/common';
import { BasketSummary, ShoppingBasket, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CheckStates } from './dto/basket.dto';

@Injectable()
export class ShoppingbasketService {
  constructor(private prisma: PrismaService) {}

  async currentBasketSummary(user: User) {
    let summary: BasketSummary;

    const products = await this.prisma.shoppingBasket.findMany({
      where: { userId: user.id },
      include: { product: { include: { images: true } } },
    });

    const found_summary = await this.prisma.basketSummary.findUnique({
      where: { userId: user.id },
    });

    const prices = products.map((item) =>
      item.product.isDiscounting
        ? item.product.discountPrice * item.quantity
        : item.product.price * item.quantity,
    );
    const finalPay = prices.reduce((acc, val) => acc + val, 0);

    const origin_prices = products.map(
      (item) => item.product.price * item.quantity,
    );
    const totalPrice = origin_prices.reduce((acc, val) => acc + val, 0);

    const discount_products = products.map((item) =>
      item.product.isDiscounting
        ? (item.product.price - item.product.discountPrice) * item.quantity
        : 0,
    );

    const totalDiscount = discount_products.reduce((acc, val) => acc + val, 0);

    if (!found_summary) {
      summary = await this.prisma.basketSummary.create({
        data: {
          finalPay,
          totalDiscount,
          totalPrice,
          user: { connect: { id: user.id } },
        },
      });
    } else {
      summary = await this.prisma.basketSummary.update({
        where: { userId: user.id },
        data: {
          finalPay,
          totalDiscount,
          totalPrice,
        },
      });
    }
    const result_products = await this.prisma.shoppingBasket.findMany({
      where: { userId: user.id },
      include: { product: { include: { images: true } } },
    });

    return { products: result_products, summary };
  }

  async getMyBasket(user: User) {
    const found = await this.prisma.shoppingBasket.findFirst({
      where: { userId: user.id },
    });

    const { products, summary } = await this.currentBasketSummary(user);

    return { products, summary };
  }

  async addProduct(user: User, productId: number) {
    const found = await this.prisma.shoppingBasket.findUnique({
      where: { userId_productId: { userId: user.id, productId } },
    });

    const found_product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!found_product) {
      throw new Error('Failed to find product');
    }

    if (!found) {
      await this.prisma.shoppingBasket.create({
        data: {
          user: { connect: { id: user.id } },
          product: { connect: { id: productId } },
        },
      });
    }

    await this.prisma.shoppingBasket.update({
      where: { userId_productId: { userId: user.id, productId } },
      data: { quantity: { increment: 1 } },
    });

    const { products, summary } = await this.currentBasketSummary(user);

    const data = { products, summary };

    return data;
  }

  async removeProduct(user: User, productId: number) {
    const found = await this.prisma.shoppingBasket.findUnique({
      where: { userId_productId: { userId: user.id, productId } },
    });

    const found_product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!found_product) {
      throw new Error('존재하지 않는 상품입니다');
    }

    if (!found) {
      throw new Error('이미 제거되었거나 장바구니에 없는 상품입니다');
    }

    const { summary, products } = await this.currentBasketSummary(user);

    const data = {
      products,
      summary,
    };

    return data;
  }

  async removeManyProduct(user: User, data: CheckStates) {
    const product_idices = { ...data };
    const keys = Object.keys(product_idices).filter(
      (val) => product_idices[val] === true,
    );

    for (const key of keys) {
      await this.removeProduct(user, Number(key));
    }

    const { products, summary } = await this.currentBasketSummary(user);

    const result = {
      products,
      summary,
    };
    return result;
  }

  async updateProductQuantity(user: User, productId: number, quantity: number) {
    await this.prisma.shoppingBasket.update({
      where: { userId_productId: { userId: user.id, productId } },
      data: { quantity: quantity },
    });

    const { products, summary } = await this.currentBasketSummary(user);

    return { products, summary };
  }
}
