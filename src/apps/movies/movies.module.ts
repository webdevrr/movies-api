import { Module } from '@nestjs/common';

import { MovieRepository } from './data-access/repository';
import { FsMovieRepository } from './data-access/repository/fs-movie-repository/fs-movie.repository';
import { MoviesController } from './entry-points/rest/v1';
import { CreateMovieUseCase } from './use-cases';

@Module({
  controllers: [MoviesController],
  providers: [CreateMovieUseCase, { provide: MovieRepository, useClass: FsMovieRepository }]
})
export class MoviesModule {}
