import { Transaction } from '../../domain/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionResponseDto } from '../dto/transaction-response.dto';
import { IUpdateTransactionDto } from '../dto/update-transaction.dto';
import { ITransactionDeleteResponse } from './transaction.repository.interfaces';

export interface ITransactionService {
  getAll(): Promise<Transaction[]>;
  getOneById(id: number): Promise<TransactionResponseDto>;
  getOneByName(name: string): Promise<TransactionResponseDto>;
  saveOne(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto>;
  updateOneOrFail(
    id: number,
    updateTransactionDto: IUpdateTransactionDto,
  ): Promise<TransactionResponseDto>;
  deleteOneOrFail(id: number): Promise<ITransactionDeleteResponse>;
}
