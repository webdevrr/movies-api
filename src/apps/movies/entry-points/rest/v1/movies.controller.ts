import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { CreateMovieDto, MoviesListDto } from '@/apps/movies/domain/dtos';
import { Genre } from '@/apps/movies/types';
import { CreateMovieUseCase, ListMoviesUseCase } from '@/apps/movies/use-cases';

@ApiTags('movies')
@Controller('api/v1/movies')
export class MoviesController {
  constructor(
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly listMoviesUseCase: ListMoviesUseCase
  ) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.createMovieUseCase.execute(createMovieDto);
  }

  @Get()
  @ApiQuery({ name: 'duration', required: false, type: Number })
  @ApiQuery({ name: 'genres', required: false, isArray: true, enum: Genre })
  list(@Query() moviesListDto: MoviesListDto) {
    const { genres, duration } = moviesListDto;
    return this.listMoviesUseCase.execute(duration, genres);
  }
}
