import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateTransactionDto } from './create-transaction.dto.interface';

export class TransactionResponseDto implements ICreateTransactionDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  type: 'buy' | 'sell';

  @ApiProperty()
  date: string;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  updatedAt?: string;

  @ApiPropertyOptional()
  deletedAt?: string;
}
