import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductService } from '../interfaces/product.service.interfaces';
import { Product } from '../../domain/product.entity';
import {
  IProductDeleteResponse,
  IProductRepository,
  PRODUCT_REPOSITORY_KEY,
} from '../interfaces/product.repository.interfaces';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductMapper } from '../mapper/product.mapper';
import { ProductResponseDto } from '../dto/product-response.dto';
import { IUpdateProductDto } from '../dto/update-product.dto';
import { PRODUCT_NOT_FOUND } from '../exception/product.exeption';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_KEY)
    private readonly productRepository: IProductRepository,
    private readonly productMapper: ProductMapper,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }

  async getOneById(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.getOneById(id);
    if (!product) {
      throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.productMapper.fromProductToProductResponseDto(product);
  }

  async getOneByName(name: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.getOneByName(name);
    if (!product) {
      throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.productMapper.fromProductToProductResponseDto(product);
  }

  async saveOne(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productRepository.saveOne(
      this.productMapper.fromCreateProductDtoToProduct(createProductDto),
    );
    return this.productMapper.fromProductToProductResponseDto(product);
  }

  async updateOneOrFail(
    id: number,
    updateProductDto: IUpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productRepository.updateOneOrFail(
      id,
      updateProductDto,
    );
    if (!product) {
      throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.productMapper.fromUpdateProductDtoToProduct(product);
  }

  async deleteOneOrFail(id: number): Promise<IProductDeleteResponse> {
    return await this.productRepository.deleteOneOrFail(id);
  }
}
