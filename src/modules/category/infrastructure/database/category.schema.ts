import { EntitySchema } from 'typeorm';

import { withBaseSchemaColumns } from '@/common/base/infrastructure/database/base.schema';

import { Category } from '../../domain/category.entity';

export const CategorySchema = new EntitySchema<Category>({
  name: 'Category',
  target: Category,
  tableName: 'pategory',
  columns: withBaseSchemaColumns({
    name: {
      type: String,
    },
    description: {
      type: String,
      nullable: true,
    },
  }),
});
