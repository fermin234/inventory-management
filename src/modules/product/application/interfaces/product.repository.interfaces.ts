import { Product } from '../../domain/product.entity';

export const PRODUCT_REPOSITORY_KEY = 'product_repository';

export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getOneById(id: number): Promise<Product>;
  getOneByName(name: string): Promise<Product>;
  saveOne(product: Product): Promise<Product>;
  updateOneOrFail(
    id: number,
    updates: Partial<Omit<Product, 'id'>>,
  ): Promise<Product>;
  deleteOneOrFail(id: number): Promise<void>;
}
