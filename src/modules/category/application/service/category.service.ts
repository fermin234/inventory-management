import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICategoryService } from '../interfaces/category.service.interfaces';
import {
  CATEGORY_REPOSITORY_KEY,
  ICategoryDeleteResponse,
  ICategoryRepository,
} from '../interfaces/category.repository.interfaces';
import { CategoryMapper } from '../mapper/category.mapper';
import { Category } from '../../domain/category.entity';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { CATEGORY_NOT_FOUND } from '../exception/category.exeption';
import { ICreateCategorytDto } from '../dto/create-category.dto.interface';
import { IUpdateCategoryDto } from '../dto/update-category.dto';
import { CreateCategorytDto } from '../dto/create-category.dto';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_KEY)
    private readonly categoryRepository: ICategoryRepository,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }

  async getOneById(id: number): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.getOneById(id);
    if (!category) {
      throw new HttpException(CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.categoryMapper.fromCategoryToCategoryResponseDto(category);
  }

  async getOneByName(name: string): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.getOneByName(name);
    if (!category) {
      throw new HttpException(CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.categoryMapper.fromCategoryToCategoryResponseDto(category);
  }

  async saveOne(
    createProductDto: CreateCategorytDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.saveOne(
      this.categoryMapper.fromCreateCategoryDtoToCategory(createProductDto),
    );
    return this.categoryMapper.fromCategoryToCategoryResponseDto(category);
  }

  async updateOneOrFail(
    id: number,
    updateCategoryDto: IUpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.updateOneOrFail(
      id,
      updateCategoryDto,
    );
    if (!category) {
      throw new HttpException(CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.categoryMapper.fromUpdateCategoryDtoToCategory(category);
  }

  async deleteOneOrFail(id: number): Promise<ICategoryDeleteResponse> {
    return await this.categoryRepository.deleteOneOrFail(id);
  }
}
