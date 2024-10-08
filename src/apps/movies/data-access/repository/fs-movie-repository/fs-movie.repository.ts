import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { MovieEntity } from '@/apps/movies/domain';
import { Movie } from '@/apps/movies/types';
import { FsService } from '@/frameworks/data/fs';
import { Cache_key } from '@/shared/types';

import { MovieRepository } from '../movie.repository';
import { FsMovieMapper } from './mapper';

export class FsMovieRepository implements MovieRepository {
  private readonly DATA_PATH = './db/db.json';
  private readonly fsMovieMapper: FsMovieMapper;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly fsService: FsService
  ) {
    this.fsMovieMapper = new FsMovieMapper();
  }

  async list(): Promise<MovieEntity[]> {
    let movies: Movie[];
    const cachedMovies: Movie[] = await this.cacheManager.get(Cache_key.movies);

    if (!cachedMovies) {
      const data = await this.fsService.readFile<{ genres: string[]; movies: Movie[] }>(
        this.DATA_PATH
      );
      movies = data.movies;
      this.cacheManager.set(Cache_key.movies, data.movies);
    } else {
      movies = cachedMovies;
    }

    return movies.map(this.fsMovieMapper.toEntity);
  }

  async create(entity: MovieEntity): Promise<number> {
    const data = await this.fsService.readFile<{ genres: string[]; movies: Movie[] }>(
      this.DATA_PATH
    );

    const lastMovieId = data.movies[data.movies.length - 1].id;
    entity.id = lastMovieId + 1;

    const movie = this.fsMovieMapper.toPersistence(entity);

    data.movies.push(movie);

    await this.fsService.writeFile(this.DATA_PATH, JSON.stringify(data));

    this.cacheManager.del(Cache_key.movies);

    return entity.id;
  }

  async listGenres(): Promise<string[]> {
    let genres: string[];
    const cachedGenres: string[] = await this.cacheManager.get(Cache_key.genres);

    if (!cachedGenres) {
      const data = await this.fsService.readFile<{ genres: string[]; movies: Movie[] }>(
        this.DATA_PATH
      );
      genres = data.genres;
      this.cacheManager.set(Cache_key.genres, data.genres);
    } else {
      genres = cachedGenres;
    }

    return genres;
  }
}
