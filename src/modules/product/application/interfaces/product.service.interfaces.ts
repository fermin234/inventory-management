import { Product } from '../../domain/product.entity';
import { ProductResponseDto } from '../dto/product-response.dto';
import { IUpdateProductDto } from '../dto/update-product.dto';
import { IProductDeleteResponse } from './product.repository.interfaces';

export interface IProductService {
  getAll(): Promise<Product[]>;
  getOneById(id: number): Promise<ProductResponseDto>;
  getOneByName(name: string): Promise<ProductResponseDto>;
  saveOne(product: Product): Promise<ProductResponseDto>;
  updateOneOrFail(
    id: number,
    updateProductDto: IUpdateProductDto,
  ): Promise<ProductResponseDto>;
  deleteOneOrFail(id: number): Promise<IProductDeleteResponse>;
}
