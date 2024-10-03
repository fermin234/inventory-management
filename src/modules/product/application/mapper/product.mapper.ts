import { Injectable } from '@nestjs/common';

import { ICreateProductDto } from '../dto/create-product.dto.interface';
import { Product } from '../../domain/product.entity';
import { ProductResponseDto } from '../dto/product-response.dto';
import { IUpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductMapper {
  fromCreateProductDtoToProduct(productDto: ICreateProductDto): Product {
    const product = new Product();
    product.name = productDto.name;
    product.description = productDto.description;
    product.price = productDto.price;
    product.stock = productDto.stock;
    product.categoryId = productDto.categoryId;
    return product;
  }

  fromUpdateProductDtoToProduct(productDto: IUpdateProductDto): Product {
    const product = new Product();
    product.name = productDto.name;
    product.description = productDto.description;
    product.price = productDto.price;
    product.stock = productDto.stock;
    product.categoryId = productDto.categoryId;
    return product;
  }

  fromProductToProductResponseDto(product: Product): ProductResponseDto {
    const productResponseDto = new ProductResponseDto();
    productResponseDto.id = product.id;
    productResponseDto.name = product.name;
    productResponseDto.description = product.description;
    productResponseDto.price = product.price;
    productResponseDto.stock = product.stock;
    productResponseDto.categoryId = product.categoryId;
    productResponseDto.createdAt = product.createdAt;
    productResponseDto.updatedAt = product.updatedAt;
    productResponseDto.deletedAt = product.deletedAt;
    return productResponseDto;
  }
}
