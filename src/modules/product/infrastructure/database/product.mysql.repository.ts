import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/product.entity';
import { ProductSchema } from './product.schema';
import {
  IProductDeleteResponse,
  IProductRepository,
} from '../../application/interfaces/product.repository.interfaces';
import { HttpException } from '@nestjs/common';

export class ProductMysqlRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductSchema)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getOneById(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['categoryId'],
    });
  }

  async getOneByName(name: string): Promise<Product> {
    return await this.productRepository.findOneBy({ name });
  }

  async saveOne(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async updateOneOrFail(
    id: number,
    updates: Partial<Omit<Product, 'id'>>,
  ): Promise<Product> {
    const productToUpdate = await this.productRepository.preload({
      ...updates,
      id,
    });

    if (!productToUpdate) {
      throw new HttpException(`Product with ID ${id} not found`, 404);
    }

    return this.productRepository.save(productToUpdate);
  }

  async deleteOneOrFail(id: number): Promise<IProductDeleteResponse> {
    const productToDelete = await this.productRepository.findOne({
      where: { id },
    });

    if (!productToDelete) {
      throw new HttpException(`Product with ID ${id} not found`, 404);
    }

    const result = await this.productRepository.softDelete(id);

    if (result.affected === 1) {
      return {
        message: 'Product successfully deleted',
        success: true,
        statusCode: 200,
      };
    } else {
      throw new HttpException('Failed to delete the product', 500);
    }
  }
}
