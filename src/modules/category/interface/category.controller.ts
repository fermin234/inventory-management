import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from '../application/service/category.service';
import { Category } from '../domain/category.entity';
import { CategoryResponseDto } from '../application/dto/category-response.dto';
import { CreateCategorytDto } from '../application/dto/create-category.dto';
import { ICategoryDeleteResponse } from '../application/interfaces/category.repository.interfaces';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<CategoryResponseDto> {
    return await this.categoryService.getOneById(id);
  }

  @Get('name/:name')
  async getOneByName(
    @Param('name') name: string,
  ): Promise<CategoryResponseDto> {
    return await this.categoryService.getOneByName(name);
  }

  @Post()
  async saveOne(
    @Body() createProductDto: CreateCategorytDto,
  ): Promise<CategoryResponseDto> {
    return await this.categoryService.saveOne(createProductDto);
  }

  @Put(':id')
  async updateOneOrFail(
    @Param('id') id: number,
    @Body() updateProductDto: CreateCategorytDto,
  ): Promise<CategoryResponseDto> {
    return await this.categoryService.updateOneOrFail(id, updateProductDto);
  }

  @Delete(':id')
  async deleteOneOrFail(
    @Param('id') id: number,
  ): Promise<ICategoryDeleteResponse> {
    return await this.categoryService.deleteOneOrFail(id);
  }
}
