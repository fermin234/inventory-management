import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateProductDto } from './create-product.dto.interface';

export class ProductResponseDto implements ICreateProductDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  updatedAt?: string;

  @ApiPropertyOptional()
  deletedAt?: string;
}
