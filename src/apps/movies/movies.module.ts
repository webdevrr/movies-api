import { Module } from '@nestjs/common';

import { FsModule } from '@/frameworks/data/fs';

import { MovieRepository } from './data-access/repository';
import { FsMovieRepository } from './data-access/repository/fs-movie-repository/fs-movie.repository';
import { MoviesController } from './entry-points/rest/v1';
import { CreateMovieUseCase, ListMoviesUseCase } from './use-cases';

@Module({
  controllers: [MoviesController],
  providers: [
    CreateMovieUseCase,
    ListMoviesUseCase,
    { provide: MovieRepository, useClass: FsMovieRepository }
  ],
  imports: [FsModule]
})
export class MoviesModule {}
