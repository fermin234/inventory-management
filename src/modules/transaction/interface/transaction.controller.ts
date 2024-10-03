import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionService } from '../application/service/transaction.service';
import { Transaction } from '../domain/transaction.entity';
import { TransactionResponseDto } from '../application/dto/transaction-response.dto';
import { ITransactionDeleteResponse } from '../application/interfaces/transaction.repository.interfaces';
import { CreateTransactionDto } from '../application/dto/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAll(): Promise<Transaction[]> {
    return await this.transactionService.getAll();
  }

  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<TransactionResponseDto> {
    return await this.transactionService.getOneById(id);
  }

  @Get('name/:name')
  async getOneByName(
    @Param('name') name: string,
  ): Promise<TransactionResponseDto> {
    return await this.transactionService.getOneByName(name);
  }

  @Post()
  async saveOne(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    return await this.transactionService.saveOne(createTransactionDto);
  }

  @Put(':id')
  async updateOneOrFail(
    @Param('id') id: number,
    @Body() updateTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    return await this.transactionService.updateOneOrFail(
      id,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  async deleteOneOrFail(
    @Param('id') id: number,
  ): Promise<ITransactionDeleteResponse> {
    return await this.transactionService.deleteOneOrFail(id);
  }
}
