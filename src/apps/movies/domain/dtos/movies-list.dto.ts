import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';

import { GenresValidator } from '../../utils/validators';

export class MoviesListDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  readonly duration: number;

  @IsOptional()
  @IsString({ each: true })
  @Validate(GenresValidator)
  readonly genres: string[];
}
