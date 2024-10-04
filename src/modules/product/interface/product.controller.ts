import { CreateProductDto } from '../application/dto/create-product.dto';
import { ProductResponseDto } from '../application/dto/product-response.dto';
import { IUpdateProductDto } from '../application/dto/update-product.dto';
import { IProductDeleteResponse } from '../application/interfaces/product.repository.interfaces';
import { ProductService } from '../application/service/product.service';
import { Product } from '../domain/product.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productService.getAll();
  }

  @Get('report')
  async generateReport(): Promise<Product[]> {
    return await this.productService.generateReport();
  }

  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<ProductResponseDto> {
    return await this.productService.getOneById(id);
  }

  @Get('name/:name')
  async getOneByName(@Param('name') name: string): Promise<ProductResponseDto> {
    return await this.productService.getOneByName(name);
  }

  @Post()
  async saveOne(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.productService.saveOne(createProductDto);
  }

  @Put(':id')
  async updateOneOrFail(
    @Param('id') id: number,
    @Body() updateProductDto: IUpdateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.productService.updateOneOrFail(id, updateProductDto);
  }

  @Delete(':id')
  async deleteOneOrFail(
    @Param('id') id: number,
  ): Promise<IProductDeleteResponse> {
    return await this.productService.deleteOneOrFail(id);
  }
}
