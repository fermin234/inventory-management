import { Base } from '@common/base/domain/base.entity';

export class Transaction extends Base {
  name: string;
  productId: number;
  count: number;
  type: 'buy' | 'sell';
  date: string;
}
