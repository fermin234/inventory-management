import { PartialType } from '@nestjs/swagger';

import { CreateProductDto } from './create-product.dto';

export class IUpdateProductDto extends PartialType(CreateProductDto) {}
