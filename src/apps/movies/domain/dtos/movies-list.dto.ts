import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class MoviesListDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  readonly duration: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
