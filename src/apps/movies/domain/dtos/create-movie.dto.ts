import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

import { Genre } from '../../types';

export class CreateMovieDto {
  @IsArray()
  @IsEnum(Genre, { each: true })
  @ArrayUnique()
  readonly genres: Genre[];

  @IsString()
  @Length(1, 255)
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsNumber()
  readonly runtime: number;

  @IsString()
  @Length(1, 255)
  readonly director: string;

  @IsOptional()
  @IsString()
  readonly actors: string;

  @IsOptional()
  @IsString()
  readonly plot: string;

  @IsOptional()
  @IsString()
  readonly posterUrl: string;
}
