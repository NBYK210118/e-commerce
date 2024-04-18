import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, Product, SellingList, User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthGuard())
  @Post('/create-cate')
  async registerCategory(@GetUser() user: User, @Body() data: Category) {
    return this.categoryService.registerCategory(user, data);
  }

  @UseGuards(AuthGuard())
  @Get('/product')
  async getAllProducts(
    @GetUser() user: User,
    @Query('category') category: string,
  ): Promise<Product | Product[]> {
    const result = await this.categoryService.getAllProducts(user, category);
    return result;
  }

  async getAllSellingProducts(
    @Query('category') category: string,
  ): Promise<Product | Product[]> {
    const result = await this.categoryService.getAllSellingProducts(category);
    return result;
  }

  @Get('')
  async getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }
}
