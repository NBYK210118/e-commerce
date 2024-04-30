import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import { AuthGuard } from '@nestjs/passport';
import { Review, User } from '@prisma/client';
import { GetUser } from 'src/user/get-user.decorator';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get('/all')
  async getAllReviewsByProduct(@Query('product_id') product_id: string) {
    return this.reviewService.getAllReviewsByProduct(+product_id);
  }

  @UseGuards(AuthGuard())
  @Post('/update')
  async reviewUpdate(@GetUser() user: User, @Body() data: ReviewDto) {
    const result = await this.reviewService.reviewUpdate(user, data);
    return result;
  }

  @UseGuards(AuthGuard())
  @Get('/checking/users/:productId')
  async checkReview(
    @GetUser() user: User,
    @Param('productId') productId: string,
  ): Promise<Boolean | Review> {
    return this.reviewService.checkUserAlreadyReview(user, +productId);
  }
}
