import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { Product, User, UserProduct } from '@prisma/client';
import { LikeState } from './like.interface';

@UseGuards(AuthGuard())
@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Get('/all')
  async getUserLikes(@GetUser() user: User): Promise<Product[] | Product> {
    return this.likeService.getUserLikes(user);
  }

  @Get('/all/likes')
  async getUserLikesByCategory(
    @GetUser() user: User,
    @Query('category') category: string,
  ): Promise<Product | Product[]> {
    return this.likeService.getUserLikesByCategory(user, category);
  }

  @Post('/islikeit')
  async updatelikeProduct(@GetUser() user: User, @Body() data: LikeState) {
    const result = await this.likeService.updatelikeProduct(user, data);
    return result;
  }
}
