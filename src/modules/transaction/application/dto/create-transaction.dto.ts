import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ICreateTransactionDto } from './create-transaction.dto.interface';

export class CreateTransactionDto implements ICreateTransactionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: 'buy' | 'sell';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: string;
}
