import { Category } from '../../domain/category.entity';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { ICategoryDeleteResponse } from './category.repository.interfaces';

export interface ICategoryService {
  getAll(): Promise<Category[]>;
  getOneById(id: number): Promise<CategoryResponseDto>;
  getOneByName(name: string): Promise<CategoryResponseDto>;
  saveOne(product: Category): Promise<CategoryResponseDto>;
  updateOneOrFail(
    id: number,
    updates: Partial<Omit<Category, 'id'>>,
  ): Promise<CategoryResponseDto>;
  deleteOneOrFail(id: number): Promise<ICategoryDeleteResponse>;
}
