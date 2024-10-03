import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './interface/transaction.controller';
import { TransactionService } from './application/service/transaction.service';
import { TransactionMysqlRepository } from './infrastructure/database/transaction.mysql.repository';
import { TransactionMapper } from './application/mapper/transaction.mapper';
import { TransactionSchema } from './infrastructure/database/transaction.schema';
import { TRANSACTION_REPOSITORY_KEY } from './application/interfaces/transaction.repository.interfaces';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionSchema])],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    {
      provide: TRANSACTION_REPOSITORY_KEY,
      useClass: TransactionMysqlRepository,
    },
    TransactionMapper,
  ],
})
export class TransactionModule {}
