import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateCategorytDto } from './create-category.dto.interface';

export class CategoryResponseDto implements ICreateCategorytDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  updatedAt?: string;

  @ApiPropertyOptional()
  deletedAt?: string;
}
