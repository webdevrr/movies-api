import { Injectable } from '@nestjs/common';

import { UseCase } from '@/core/base';

import { MovieRepository } from '../data-access/repository';
import { MovieEntity } from '../domain';
import { CreateMovieDto } from '../domain/dtos';

@Injectable()
export class CreateMovieUseCase implements UseCase<void> {
  constructor(private readonly movieRepository: MovieRepository) {}

  public async execute(createMovieDto: CreateMovieDto): Promise<void> {
    const { title, genres, year, runtime, director, actors, plot, posterUrl } = createMovieDto;
    const movie = new MovieEntity(title, genres, year, runtime, director, actors, plot, posterUrl);

    return await this.movieRepository.create(movie);
  }
}
