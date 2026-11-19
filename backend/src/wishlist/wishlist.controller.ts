import { ForbiddenException, ParseIntPipe } from '@nestjs/common';
import { GetUser } from '../user/get-user.decorator';
import { User } from '@prisma/client';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Product, WishList } from '@prisma/client';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @UseGuards(AuthGuard())
  @Get(':userId')
  async getLikedProducts(
    @GetUser() user: User,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    if (user.id !== userId) throw new ForbiddenException();
    const result = await this.wishlistService.getLikedProducts(Number(userId));
    return result;
  }
}
