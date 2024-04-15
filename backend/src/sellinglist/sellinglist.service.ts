import { Injectable } from '@nestjs/common';
import { Product, SellingList, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateDto } from './dto/update.dto';

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
}
