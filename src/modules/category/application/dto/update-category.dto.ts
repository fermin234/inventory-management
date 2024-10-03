import { PartialType } from '@nestjs/swagger';
import { CreateCategorytDto } from './create-category.dto';

export class IUpdateCategoryDto extends PartialType(CreateCategorytDto) {}
