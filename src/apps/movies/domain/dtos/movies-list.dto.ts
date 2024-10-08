import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { Genre } from '../../types';

export class MoviesListDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  readonly duration: number;

  @IsOptional()
  @IsEnum(Genre, { each: true })
  readonly genres: Genre[];
}
