export interface ICreateTransactionDto {
  name: string;
  productId: number;
  count: number;
  type: 'buy' | 'sell';
  date: string;
}
