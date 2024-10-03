import { Injectable } from '@nestjs/common';

import { ICreateTransactionDto } from '../dto/create-transaction.dto.interface';
import { TransactionResponseDto } from '../dto/transaction-response.dto';
import { IUpdateTransactionDto } from '../dto/update-transaction.dto';
import { Transaction } from '../../domain/transaction.entity';

@Injectable()
export class TransactionMapper {
  fromCreateTransactionDtoToTransaction(
    transactionDto: ICreateTransactionDto,
  ): Transaction {
    const product = new Transaction();
    product.name = transactionDto.name;
    product.count = transactionDto.count;
    product.productId = transactionDto.productId;
    product.type = transactionDto.type;
    product.date = transactionDto.date;
    return product;
  }

  fromUpdateTransactionDtoToTransaction(
    transactionDto: IUpdateTransactionDto,
  ): Transaction {
    const product = new Transaction();
    product.name = transactionDto.name;
    product.count = transactionDto.count;
    product.productId = transactionDto.productId;
    product.type = transactionDto.type;
    product.date = transactionDto.date;
    return product;
  }

  fromTransactionToTransactionResponseDto(
    transaction: Transaction,
  ): TransactionResponseDto {
    const transactionResponseDto = new TransactionResponseDto();
    transactionResponseDto.id = transaction.id;
    transactionResponseDto.name = transaction.name;
    transactionResponseDto.productId = transaction.productId;
    transactionResponseDto.count = transaction.count;
    transactionResponseDto.type = transaction.type;
    transactionResponseDto.date = transaction.date;
    transactionResponseDto.createdAt = transaction.createdAt;
    transactionResponseDto.updatedAt = transaction.updatedAt;
    transactionResponseDto.deletedAt = transaction.deletedAt;
    return transactionResponseDto;
  }
}
