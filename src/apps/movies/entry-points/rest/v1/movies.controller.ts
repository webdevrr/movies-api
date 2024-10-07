import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateMovieUseCase } from '@/apps/movies/use-cases';

@ApiTags('movies')
@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly createMovieUseCase: CreateMovieUseCase) {}

  @Post()
  create() {
    return this.createMovieUseCase.execute();
  }
}
