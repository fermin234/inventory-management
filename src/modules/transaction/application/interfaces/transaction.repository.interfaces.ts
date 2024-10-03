import { Transaction } from '../../domain/transaction.entity';

export const TRANSACTION_REPOSITORY_KEY = 'transaction_repository';

export interface ITransactionRepository {
  getAll(): Promise<Transaction[]>;
  getOneById(id: number): Promise<Transaction>;
  getOneByName(name: string): Promise<Transaction>;
  saveOne(product: Transaction): Promise<Transaction>;
  updateOneOrFail(
    id: number,
    updates: Partial<Omit<Transaction, 'id'>>,
  ): Promise<Transaction>;
  deleteOneOrFail(id: number): Promise<ITransactionDeleteResponse>;
}

export interface ITransactionDeleteResponse {
  message: string;
  success: boolean;
  statusCode: number;
}
