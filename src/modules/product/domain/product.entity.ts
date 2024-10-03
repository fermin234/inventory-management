import { Base } from '@common/base/domain/base.entity';

export class Product extends Base {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
}
