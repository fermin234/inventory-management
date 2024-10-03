import { Injectable } from '@nestjs/common';

import { Category } from '../../domain/category.entity';
import { ICreateCategorytDto } from '../dto/create-category.dto.interface';
import { IUpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryResponseDto } from '../dto/category-response.dto';

@Injectable()
export class CategoryMapper {
  fromCreateCategoryDtoToCategory(categoryDto: ICreateCategorytDto): Category {
    const category = new Category();
    category.name = categoryDto.name;
    category.description = categoryDto.description;
    return category;
  }

  fromUpdateCategoryDtoToCategory(categoryDto: IUpdateCategoryDto): Category {
    const category = new Category();
    category.name = categoryDto.name;
    category.description = categoryDto.description;
    return category;
  }

  fromCategoryToCategoryResponseDto(category: Category): CategoryResponseDto {
    const categoryResponseDto = new CategoryResponseDto();
    categoryResponseDto.id = category.id;
    categoryResponseDto.name = category.name;
    categoryResponseDto.description = category.description;
    categoryResponseDto.createdAt = category.createdAt;
    categoryResponseDto.updatedAt = category.updatedAt;
    categoryResponseDto.deletedAt = category.deletedAt;
    return categoryResponseDto;
  }
}
