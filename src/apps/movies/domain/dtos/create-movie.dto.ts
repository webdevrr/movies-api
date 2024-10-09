import { ArrayNotEmpty, IsNumber, IsOptional, IsString, Length, Validate } from 'class-validator';

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
  readonly year: number;

  @IsNumber()
  readonly runtime: number;

  @IsString()
  @Length(1, 255)
  readonly director: string;

  @IsOptional()
  @IsString()
  readonly actors?: string;

  @IsOptional()
  @IsString()
  readonly plot?: string;

  @IsOptional()
  @IsString()
  readonly posterUrl?: string;
}
