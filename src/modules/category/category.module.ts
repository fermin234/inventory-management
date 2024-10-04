import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './interface/category.controller';
import { CategoryService } from './application/service/category.service';
import { CATEGORY_REPOSITORY_KEY } from './application/interfaces/category.repository.interfaces';
import { CategoryMysqlRepository } from './infrastructure/database/category.mysql.repository';
import { CategoryMapper } from './application/mapper/category.mapper';
import { CategorySchema } from './infrastructure/database/category.schema';

@Module({
  imports: [TypeOrmModule.forFeature([CategorySchema])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: CATEGORY_REPOSITORY_KEY,
      useClass: CategoryMysqlRepository,
    },
    CategoryMapper,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
