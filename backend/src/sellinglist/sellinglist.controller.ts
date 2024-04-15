import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SellinglistService } from './sellinglist.service';
import { GetUser } from 'src/user/get-user.decorator';
import { Product, User } from '@prisma/client';
import { UpdateDto } from './dto/update.dto';

@Controller('sellinglist')
export class SellinglistController {
  constructor(private sellinglist: SellinglistService) {}

  @UseGuards(AuthGuard())
  @Get('/')
  async getSellinglist(@GetUser() user: User, @Query('limit') limit: string) {
    console.log('asdfasdfasdf', limit);
    return this.sellinglist.getSellinglist(user, +limit);
  }
}
