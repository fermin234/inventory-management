import { EntitySchema } from 'typeorm';

import { withBaseSchemaColumns } from '@/common/base/infrastructure/database/base.schema';

import { Product } from '@/modules/product/domain/product.entity';

export const ProductSchema = new EntitySchema<Product>({
  name: 'Product',
  target: Product,
  tableName: 'product',
  columns: withBaseSchemaColumns({
    name: {
      type: String,
    },
    description: {
      type: String,
      nullable: true,
    },
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    categoryId: {
      type: Number,
    },
  }),
  relations: {
    categoryId: {
      type: 'many-to-one',
      target: 'Category',
      joinColumn: { name: 'categoryId' },
    },
    transactions: {
      type: 'one-to-many',
      target: 'Transaction',
    },
  },
});
