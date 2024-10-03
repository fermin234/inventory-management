import { EntitySchema } from 'typeorm';

import { withBaseSchemaColumns } from '@/common/base/infrastructure/database/base.schema';

import { Transaction } from '../../domain/transaction.entity';

export const TransactionSchema = new EntitySchema<Transaction>({
  name: 'Transaction',
  target: Transaction,
  tableName: 'transaction',
  columns: withBaseSchemaColumns({
    name: {
      type: String,
    },
    count: {
      type: Number,
    },
    productId: {
      type: Number,
    },
    type: {
      type: String,
    },
    date: {
      type: String,
    },
  }),
});
