import { MovieRepository } from '@/apps/movies/data-access/repository';
import { FsMovieMapper } from '@/apps/movies/data-access/repository/fs-movie-repository/mapper';
import { MovieEntity } from '@/apps/movies/domain';
import { Movie } from '@/apps/movies/types';

import { mockData } from './mock-data';

export class MockMovieRepository implements MovieRepository {
  private readonly data: { genres: string[]; movies: Movie[] } = mockData;
  private readonly fsMovieMapper: FsMovieMapper;

  constructor() {
    this.fsMovieMapper = new FsMovieMapper();
  }

  async list(): Promise<MovieEntity[]> {
    return this.data.movies.map(this.fsMovieMapper.toEntity);
  }

  async create(entity: MovieEntity): Promise<void> {
    const lastMovieId =
      this.data.movies.length > 0 ? this.data.movies[this.data.movies.length - 1].id : 0;
    entity.id = lastMovieId + 1;

    const movie = this.fsMovieMapper.toPersistence(entity);

    this.data.movies.push(movie);
  }
}
