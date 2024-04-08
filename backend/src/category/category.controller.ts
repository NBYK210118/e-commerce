import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, Product, User } from '@prisma/client';
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

  @Get('/:name')
  async getAllProducts(@Param('name') category: string): Promise<Product[]> {
    const result = await this.categoryService.getAllProducts(category);
    return result;
  }

  @Get('')
  async getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }
}
