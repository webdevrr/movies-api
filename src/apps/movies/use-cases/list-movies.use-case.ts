import { Injectable } from '@nestjs/common';

import { UseCase } from '@/core/base';

import { MovieRepository } from '../data-access/repository';
import { MovieEntity } from '../domain';
import { MovieDto } from '../domain/dtos';
import { MovieMapper } from '../domain/mappers';

@Injectable()
export class ListMoviesUseCase implements UseCase<MovieDto[] | []> {
  private readonly movieMapper: MovieMapper;

  constructor(private readonly movieRepository: MovieRepository) {
    this.movieMapper = new MovieMapper();
  }

  public async execute(duration?: number, genres?: string[]): Promise<MovieDto[] | []> {
    const moviesData = await this.movieRepository.list(duration, genres);
    let movies: MovieEntity[] | [];

    if (!duration && !genres) {
      movies = this.getRandomMovie(moviesData);
    }

    if (duration && !genres) {
      const moviesFilteredByDurationRange = this.filterMoviesByDurationRange(
        moviesData,
        duration - 10,
        duration + 10
      );
      movies = this.getRandomMovie(moviesFilteredByDurationRange);
    }

    if (!duration && genres) {
      movies = this.filterAndSortMoviesByGenres(moviesData, genres);
    }

    if (duration && genres) {
      const moviesFilteredByDurationRange = this.filterMoviesByDurationRange(
        moviesData,
        duration - 10,
        duration + 10
      );
      movies = this.filterAndSortMoviesByGenres(moviesFilteredByDurationRange, genres);
    }

    return movies.length === 0 ? [] : movies.map(this.movieMapper.toDto);
  }

  private filterAndSortMoviesByGenres(movies: MovieEntity[], genres: string[]) {
    const filteredMovies = movies.filter(movie =>
      movie.genres.some(genre => genres.includes(genre))
    );

    const sortedMovies = filteredMovies.sort((a, b) => {
      const aMatches = a.genres.filter(genre => genres.includes(genre)).length;
      const bMatches = b.genres.filter(genre => genres.includes(genre)).length;
      return bMatches - aMatches;
    });

    return sortedMovies;
  }

  private filterMoviesByDurationRange(
    movies: MovieEntity[],
    minDuration: number,
    maxDuration: number
  ) {
    const filteredMovies = movies.filter(
      movie => parseInt(movie.runtime) >= minDuration && parseInt(movie.runtime) <= maxDuration
    );
    return filteredMovies;
  }

  private getRandomMovie(movies: MovieEntity[]): MovieEntity[] | [] {
    if (movies.length === 0) {
      return [];
    }
    const randomIndex = Math.floor(Math.random() * movies.length);
    return [movies[randomIndex]];
  }
}
