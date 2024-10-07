import { Injectable } from '@nestjs/common';

import { UseCase } from '@/core/base';

import { MovieRepository } from '../data-access/repository';
import { MovieDto } from '../domain/dtos';
import { MovieMapper } from '../domain/mappers';
import { Genre } from '../types';

@Injectable()
export class ListMoviesUseCase implements UseCase<MovieDto[]> {
  private readonly movieMapper: MovieMapper;

  constructor(private readonly movieRepository: MovieRepository) {
    this.movieMapper = new MovieMapper();
  }

  public async execute(duration?: number, genres?: Genre[]): Promise<MovieDto[]> {
    const movies = await this.movieRepository.list(duration, genres);

    return movies.map(this.movieMapper.toDto);
  }
}
