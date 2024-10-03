import { PartialType } from '@nestjs/swagger';

import { CreateTransactionDto } from './create-transaction.dto';

export class IUpdateTransactionDto extends PartialType(CreateTransactionDto) {}
