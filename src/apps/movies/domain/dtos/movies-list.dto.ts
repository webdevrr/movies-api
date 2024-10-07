import { Transform } from 'class-transformer';
import { ArrayUnique, IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';

import { Genre } from '../../types';

export class MoviesListDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly duration: number;

  @IsArray()
  @IsOptional()
  @IsEnum(Genre, { each: true })
  @ArrayUnique()
  readonly genres: Genre[];
}
