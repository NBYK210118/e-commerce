import { Module } from '@nestjs/common';
import { ProductImageController } from './product-image.controller';
import { ProductImageService } from './product-image.service';

@Module({
  controllers: [ProductImageController],
  providers: [ProductImageService]
})
export class ProductImageModule {}
