import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateMovieDto } from '@/apps/movies/domain/dtos';
import { CreateMovieUseCase } from '@/apps/movies/use-cases';

@ApiTags('movies')
@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly createMovieUseCase: CreateMovieUseCase) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.createMovieUseCase.execute(createMovieDto);
  }
}
