export interface ICreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
}
