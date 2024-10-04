import { Module } from '@nestjs/common';
import { ProductController } from './interface/product.controller';
import { ProductService } from './application/service/product.service';
import { ProductMysqlRepository } from './infrastructure/database/product.mysql.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema } from './infrastructure/database/product.schema';
import { PRODUCT_REPOSITORY_KEY } from './application/interfaces/product.repository.interfaces';
import { ProductMapper } from './application/mapper/product.mapper';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema]), CategoryModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY_KEY,
      useClass: ProductMysqlRepository,
    },
    ProductMapper,
  ],
  exports: [ProductService],
})
export class ProductModule {}
