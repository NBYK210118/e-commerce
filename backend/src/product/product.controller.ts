import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { Product, SellingList, User, ViewedProduct } from '@prisma/client';
import { GetUser } from 'src/user/get-user.decorator';
import { ProductStatus } from '../sellinglist/product.interface';
import ProductDetailDto from 'src/user/dto/addProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/all')
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get('')
  async getProduct(@Query('product_id') product_id: string) {
    if (!product_id) {
      return;
    }
    return this.productService.getProduct(+product_id);
  }

  @UseGuards(AuthGuard())
  @Get('/my-store/everypage/')
  async getProductsByPage(
    @GetUser() user: User,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.productService.getProductsByPage(user, +page, +limit);
  }

  @Get('')
  async getProductsBySearchKeyword(
    @Query('search_keyword') search_keyword: string,
  ) {
    return this.productService.getProductsBySearchKeyword(search_keyword);
  }

  @Get('/all/discounting')
  async getDiscountingProducts(): Promise<Product[]> {
    return this.productService.getDiscountingProducts();
  }

  @UseGuards(AuthGuard())
  @Get('/my-store/:category')
  async getCategoryItems(
    @GetUser() user: User,
    @Param('category') category: string,
    @Query('limit') limit: string,
  ) {
    return this.productService.getCategoryItems(user, category, +limit);
  }

  @UseGuards(AuthGuard())
  @Get('/is-users/:productId')
  async isUsersProduct(
    @GetUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<Boolean> {
    return this.productService.isUsersProduct(user, productId);
  }

  @UseGuards(AuthGuard())
  @Post('/my-store/searching')
  async getProductByName(@Body('keyword') keyword: string) {
    return this.productService.getProductByName(keyword);
  }

  @Post('/guest/viewed')
  async guestWatchedProduct(
    @Query('productId', ParseIntPipe) productId: string,
  ): Promise<void> {
    return this.productService.guestWatchedProduct(+productId);
  }

  @Post('/user/viewed')
  @UseGuards(AuthGuard())
  async userWatchedProduct(
    @GetUser() user: User,
    @Query('productId', ParseIntPipe) productId: string,
  ): Promise<ViewedProduct[]> {
    return this.productService.userWatchedProduct(user, +productId);
  }

  @Get('/all/random-recommend')
  async getRecommend(): Promise<Product[]> {
    return this.productService.getRecommend();
  }

  @UseGuards(AuthGuard())
  @Post('/my-store/add/product')
  async addProduct(
    @GetUser() user: User,
    @Body() addProductDto: ProductDetailDto,
  ): Promise<SellingList> {
    return this.productService.addProduct(user, addProductDto);
  }

  @UseGuards(AuthGuard())
  @Post('/my-store/update-product/:id')
  async updateProduct(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() updateProduct: ProductDetailDto,
  ): Promise<SellingList> {
    console.log('update 요청 들어옴');
    return this.productService.updateProduct(user, id, updateProduct);
  }
}
