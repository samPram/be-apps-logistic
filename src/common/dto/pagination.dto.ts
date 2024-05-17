import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsString, Max, Min } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

const sortOperator = ['ASC', 'DESC'] as const;
export type SortOperator = (typeof sortOperator)[number];

export class PaginationQueryDto implements IPaginationOptions {
  @IsNumber()
  @Transform((param) => parseInt(param.value))
  page = 1;

  @IsNumber()
  @Transform((param) => parseInt(param.value))
  @Min(0)
  @Max(100)
  limit = 10;

  @IsString()
  column = 'id';

  @IsIn(sortOperator)
  sort: SortOperator = 'ASC';

  @IsString()
  search = '';
}
