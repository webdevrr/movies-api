import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMovieDto, MovieDto, MoviesListDto } from '@/apps/movies/domain/dtos';
import { ApiEndpointDescription } from '@/apps/movies/types/api-description';
import { CreateMovieUseCase, ListMoviesUseCase } from '@/apps/movies/use-cases';

@ApiTags('movies')
@Controller('api/v1/movies')
export class MoviesController {
  constructor(
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly listMoviesUseCase: ListMoviesUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movie', description: ApiEndpointDescription.create_movie })
  @ApiResponse({ status: 201, description: 'The movie has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. The request body is invalid.' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. An error occurred while creating the movie.'
  })
  create(@Body() createMovieDto: CreateMovieDto): Promise<void> {
    return this.createMovieUseCase.execute(createMovieDto);
  }

  @Get()
  @ApiQuery({ name: 'duration', required: false, type: Number })
  @ApiQuery({ name: 'genres', required: false, isArray: true, type: String })
  @ApiOperation({ summary: 'List movies', description: ApiEndpointDescription.list_movies })
  @ApiResponse({
    status: 200,
    description: 'Movies have been successfully returned.',
    type: [MovieDto]
  })
  @ApiResponse({ status: 400, description: 'Bad Request. The request body is invalid.' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. An error occurred while listing movies.'
  })
  list(@Query() moviesListDto: MoviesListDto): Promise<MovieDto[] | []> {
    const { genres, duration } = moviesListDto;
    return this.listMoviesUseCase.execute(duration, genres);
  }
}
