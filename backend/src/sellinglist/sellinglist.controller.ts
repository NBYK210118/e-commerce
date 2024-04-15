import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SellinglistService } from './sellinglist.service';
import { GetUser } from 'src/user/get-user.decorator';
import { Product, SellingList, User } from '@prisma/client';
import { UpdateDto } from './dto/update.dto';
import { ProductStatus } from './product.interface';

@UseGuards(AuthGuard())
@Controller('sellinglist')
export class SellinglistController {
  constructor(private sellinglist: SellinglistService) {}

  @Get('/')
  async getSellinglist(@GetUser() user: User, @Query('limit') limit: string) {
    return this.sellinglist.getSellinglist(user, +limit);
  }

  @Put('/update/status')
  async updateProductStatus(
    @GetUser() user: User,
    @Body() data: ProductStatus,
  ): Promise<SellingList> {
    const result = await this.sellinglist.updateProductStatus(user, data);
    return result;
  }
}
