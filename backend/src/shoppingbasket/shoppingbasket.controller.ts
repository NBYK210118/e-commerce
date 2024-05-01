import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ShoppingbasketService } from './shoppingbasket.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from '@prisma/client';
import { CheckStates } from './dto/basket.dto';

@UseGuards(AuthGuard())
@Controller('shoppingbasket')
export class ShoppingbasketController {
  constructor(private basketService: ShoppingbasketService) {}

  @Get('')
  async getMyBasket(@GetUser() user: User) {
    return this.basketService.getMyBasket(user);
  }

  @Post('/add')
  async addProduct(
    @GetUser() user: User,
    @Query('product_id') productId: string,
  ) {
    return this.basketService.addProduct(user, +productId);
  }

  @Post('/remove')
  async removeProduct(
    @GetUser() user: User,
    @Query('product_id') productId: string,
  ) {
    return this.basketService.removeProduct(user, +productId);
  }

  @Post('/remove/list')
  async removeManyProduct(@GetUser() user: User, @Body() data: CheckStates) {
    return this.basketService.removeManyProduct(user, data);
  }

  @Post('/update')
  async updateProductQuantity(
    @GetUser() user: User,
    @Query('productId') productId: string,
    @Query('quantity') quantity: string,
  ) {
    return this.basketService.updateProductQuantity(
      user,
      +productId,
      +quantity,
    );
  }
}
