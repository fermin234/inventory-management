import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITransactionService } from '../interfaces/transaction.service.interfaces';
import {
  ITransactionDeleteResponse,
  ITransactionRepository,
  TRANSACTION_REPOSITORY_KEY,
} from '../interfaces/transaction.repository.interfaces';
import { TransactionMapper } from '../mapper/transaction.mapper';
import { Transaction } from '../../domain/transaction.entity';
import { TransactionResponseDto } from '../dto/transaction-response.dto';
import { TRANSACTION_NOT_FOUND } from '../exception/transaction.exeption';
import { IUpdateTransactionDto } from '../dto/update-transaction.dto';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { ProductService } from '@/modules/product/application/service/product.service';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY_KEY)
    private readonly transactionRepository: ITransactionRepository,
    private readonly transactionMapper: TransactionMapper,
    @Inject(ProductService)
    private readonly productService: ProductService,
  ) {}

  async getAll(): Promise<Transaction[]> {
    return await this.transactionRepository.getAll();
  }

  async getOneById(id: number): Promise<TransactionResponseDto> {
    const product = await this.transactionRepository.getOneById(id);
    if (!product) {
      throw new HttpException(TRANSACTION_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.transactionMapper.fromTransactionToTransactionResponseDto(
      product,
    );
  }

  async getOneByName(name: string): Promise<TransactionResponseDto> {
    const product = await this.transactionRepository.getOneByName(name);
    if (!product) {
      throw new HttpException(TRANSACTION_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.transactionMapper.fromTransactionToTransactionResponseDto(
      product,
    );
  }

  async saveOne(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    const product = await this.productService.getOneById(
      createTransactionDto.productId,
    );

    if (createTransactionDto.type === 'buy') {
      product.stock += createTransactionDto.count;
    } else {
      if (product.stock > createTransactionDto.count) {
        product.stock -= createTransactionDto.count;
      } else {
        throw new HttpException('Insufficient stock', HttpStatus.BAD_REQUEST);
      }
    }

    await this.productService.updateOneOrFail(product.id, product);

    const transaction = await this.transactionRepository.saveOne(
      this.transactionMapper.fromCreateTransactionDtoToTransaction(
        createTransactionDto,
      ),
    );
    return this.transactionMapper.fromTransactionToTransactionResponseDto(
      transaction,
    );
  }

  async updateOneOrFail(
    id: number,
    updateTransactionDto: IUpdateTransactionDto,
  ): Promise<TransactionResponseDto> {
    const product = await this.transactionRepository.updateOneOrFail(
      id,
      updateTransactionDto,
    );
    if (!product) {
      throw new HttpException(TRANSACTION_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.transactionMapper.fromUpdateTransactionDtoToTransaction(
      product,
    );
  }

  async deleteOneOrFail(id: number): Promise<ITransactionDeleteResponse> {
    return await this.transactionRepository.deleteOneOrFail(id);
  }
}
