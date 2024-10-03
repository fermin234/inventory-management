import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../domain/category.entity';
import { Repository } from 'typeorm';
import { CategorySchema } from './category.schema';
import { HttpException } from '@nestjs/common';
import {
  ICategoryDeleteResponse,
  ICategoryRepository,
} from '../../application/interfaces/category.repository.interfaces';

export class CategoryMysqlRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategorySchema)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getOneById(id: number): Promise<Category> {
    return await this.categoryRepository.findOneBy({ id });
  }

  async getOneByName(name: string): Promise<Category> {
    return await this.categoryRepository.findOneBy({ name });
  }

  async saveOne(product: Category): Promise<Category> {
    return await this.categoryRepository.save(product);
  }

  async updateOneOrFail(
    id: number,
    updates: Partial<Omit<Category, 'id'>>,
  ): Promise<Category> {
    const categoryToUpdate = await this.categoryRepository.preload({
      ...updates,
      id,
    });

    if (!categoryToUpdate) {
      throw new HttpException(`Category with ID ${id} not found`, 404);
    }

    return this.categoryRepository.save(categoryToUpdate);
  }

  async deleteOneOrFail(id: number): Promise<ICategoryDeleteResponse> {
    const categoryToDelete = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryToDelete) {
      throw new HttpException(`Category with ID ${id} not found`, 404);
    }

    const result = await this.categoryRepository.softDelete(id);

    if (result.affected === 1) {
      return {
        message: 'Category successfully deleted',
        success: true,
        statusCode: 200,
      };
    } else {
      throw new HttpException('Failed to delete the product', 500);
    }
  }
}
