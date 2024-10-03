import { Category } from '../../domain/category.entity';

export const CATEGORY_REPOSITORY_KEY = 'category_repository';

export interface ICategoryRepository {
  getAll(): Promise<Category[]>;
  getOneById(id: number): Promise<Category>;
  getOneByName(name: string): Promise<Category>;
  saveOne(product: Category): Promise<Category>;
  updateOneOrFail(
    id: number,
    updates: Partial<Omit<Category, 'id'>>,
  ): Promise<Category>;
  deleteOneOrFail(id: number): Promise<ICategoryDeleteResponse>;
}

export interface ICategoryDeleteResponse {
  message: string;
  success: boolean;
  statusCode: number;
}
