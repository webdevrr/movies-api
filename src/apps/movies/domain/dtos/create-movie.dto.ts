import { ArrayUnique, IsArray, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateMovieDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
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
