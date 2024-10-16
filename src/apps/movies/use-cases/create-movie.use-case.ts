import { Injectable } from '@nestjs/common';

import { Logger } from '@/common/logger';
import { UseCase } from '@/core/base';

import { MovieRepository } from '../data-access/repository';
import { MovieEntity } from '../domain';
import { CreateMovieDto } from '../domain/dtos';

@Injectable()
export class CreateMovieUseCase implements UseCase<void> {
  private readonly logger = new Logger();

  constructor(private readonly movieRepository: MovieRepository) {}

  public async execute(createMovieDto: CreateMovieDto): Promise<void> {
    const { title, genres, year, runtime, director, actors, plot, posterUrl } = createMovieDto;
    const movie = new MovieEntity(
      title,
      genres,
      String(year),
      String(runtime),
      director,
      actors,
      plot,
      posterUrl
    );

    const id = await this.movieRepository.create(movie);
    this.logger.log(`Created movie with id ${id}`);
  }
}
