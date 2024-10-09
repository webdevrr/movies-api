import {
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
  MinLength,
  Validate
} from 'class-validator';

import { GenresValidator } from '../../utils/validators';

export class CreateMovieDto {
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Validate(GenresValidator)
  readonly genres: string[];

  @IsString()
  @Length(1, 255)
  readonly title: string;

  @IsNumber()
  @Min(0)
  readonly year: number;

  @IsNumber()
  @Min(0)
  readonly runtime: number;

  @IsString()
  @Length(1, 255)
  readonly director: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  readonly actors?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  readonly plot?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  readonly posterUrl?: string;
}
