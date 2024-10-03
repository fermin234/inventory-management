import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionSchema } from './transaction.schema';
import {
  ITransactionDeleteResponse,
  ITransactionRepository,
} from '../../application/interfaces/transaction.repository.interfaces';
import { Transaction } from '../../domain/transaction.entity';
import { HttpException } from '@nestjs/common';

export class TransactionMysqlRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionSchema)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async getAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async getOneById(id: number): Promise<Transaction> {
    return await this.transactionRepository.findOneBy({ id });
  }

  async getOneByName(name: string): Promise<Transaction> {
    return await this.transactionRepository.findOneBy({ name });
  }

  async saveOne(product: Transaction): Promise<Transaction> {
    return await this.transactionRepository.save(product);
  }

  async updateOneOrFail(
    id: number,
    updates: Partial<Omit<Transaction, 'id'>>,
  ): Promise<Transaction> {
    const productToUpdate = await this.transactionRepository.preload({
      ...updates,
      id,
    });

    if (!productToUpdate) {
      throw new HttpException(`Transaction with ID ${id} not found`, 404);
    }

    return this.transactionRepository.save(productToUpdate);
  }

  async deleteOneOrFail(id: number): Promise<ITransactionDeleteResponse> {
    const productToDelete = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!productToDelete) {
      throw new HttpException(`Transaction with ID ${id} not found`, 404);
    }

    const result = await this.transactionRepository.softDelete(id);

    if (result.affected === 1) {
      return {
        message: 'Transaction successfully deleted',
        success: true,
        statusCode: 200,
      };
    } else {
      throw new HttpException('Failed to delete the product', 500);
    }
  }
}
