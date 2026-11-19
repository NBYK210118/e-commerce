import { Public, AdminGuard } from '../security/security';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Profile, User } from '@prisma/client';
import { signInDto, signUpDto } from './dto/sign.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GetUser } from './get-user.decorator';
import { UserProfileDto } from './dto/user.dto';
import ProductDetailDto from './dto/addProduct.dto';
import { ProductStatus } from 'src/sellinglist/product.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get()
  async emailUser(@GetUser() user: User) {
    return this.userService.emailUser(user.email);
  }

  @Get('/all')
  @UseGuards(AdminGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard())
  @Get('/verify')
  async verifyToken(@GetUser() user: User) {
    return { user: await this.userService.emailUser(user.email) };
  }

  @Post('/signup')
  @HttpCode(200)
  @Public()
  async signUp(@Body() data: signUpDto) {
    return this.userService.signUp(data);
  }

  @Post('/signin')
  @Public()
  async signIn(@Body() signInDto: signInDto): Promise<String> {
    return this.userService.signIn(signInDto);
  }

  @Delete('/del-user/:id')
  @UseGuards(AdminGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }

  @Delete('/del-all-user')
  @UseGuards(AdminGuard)
  async deleteAllUsers() {
    return this.userService.deleteAllUsers();
  }

  @UseGuards(AuthGuard())
  @Get('/my-profile')
  async getProfile(@GetUser() user: User) {
    return this.userService.getProfile(user);
  }

  @Get('/my-profile/all')
  @UseGuards(AdminGuard)
  async getAllProfile(): Promise<Profile[]> {
    return this.userService.getAllProfile();
  }

  @UseGuards(AuthGuard())
  @Post('/my-profile/nickname')
  async updateNickname(
    @GetUser() user: User,
    @Body('nickname') nickname: string,
  ): Promise<User> {
    return this.userService.updateNickname(user, nickname);
  }

  @UseGuards(AuthGuard())
  @Post('/my-profile/update')
  async updateProfile(@GetUser() user: User, @Body() data: UserProfileDto) {
    const result = await this.userService.updateProfile(user, data);
    return result;
  }

  @Post('/my-profile/upload')
  @UseGuards(AuthGuard())
  async uploadImage(@Req() req: Request, @GetUser() user: User) {
    const { imageUrl, image_size } = req.body;
    const result = await this.userService.uploadProfileImage(
      user,
      imageUrl,
      Number(image_size),
    );
    return { user: result };
  }

  @Delete('/my-profile/:id')
  @UseGuards(AdminGuard)
  async deleteProfile(@Param('id', ParseIntPipe) id: number): Promise<Profile> {
    return this.userService.deleteProfile(Number(id));
  }

  @UseGuards(AuthGuard())
  @Post('/my-store')
  async getProductsWhileUpdate(
    @GetUser() user: User,
    @Body('checklist') checklist: string,
  ) {
    if (
      typeof checklist !== 'string' ||
      !/^[1-9]\d*(,[1-9]\d*)*$/.test(checklist) ||
      checklist.split(',').length > 100
    ) {
      throw new BadRequestException('Invalid product selection');
    }
    const converted_checklist = checklist.split(',').map(Number);
    return this.userService.getProductsWhileUpdate(user, converted_checklist);
  }

  @UseGuards(AuthGuard())
  @Post('/my-store/delete-product')
  async deleteProduct(@GetUser() user: User, @Body() data: ProductStatus) {
    return this.userService.deleteProduct(user, data);
  }
}
