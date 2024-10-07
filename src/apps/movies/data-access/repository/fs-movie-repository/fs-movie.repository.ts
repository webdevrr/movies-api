import { readFile, writeFile } from 'node:fs/promises';

import { MovieEntity } from '@/apps/movies/domain';
import { Genre, Movie } from '@/apps/movies/types';

import { MovieRepository } from '../movie.repository';
import { FsMovieMapper } from './mapper';

export class FsMovieRepository implements MovieRepository {
  private readonly DATA_PATH = './db.json';
  private readonly fsMovieMapper: FsMovieMapper;

  constructor() {
    this.fsMovieMapper = new FsMovieMapper();
  }

  async list(): Promise<MovieEntity[]> {
    const buffer = await readFile(this.DATA_PATH);
    const { movies }: { genres: Genre[]; movies: Movie[] } = JSON.parse(buffer.toString());

    return movies.map(this.fsMovieMapper.toEntity);
  }

  async create(entity: MovieEntity): Promise<void> {
    const buffer = await readFile(this.DATA_PATH);
    const data: { genres: Genre[]; movies: Movie[] } = JSON.parse(buffer.toString());

    const lastMovieId = data.movies[data.movies.length - 1].id;
    entity.id = lastMovieId + 1;

    const movie = this.fsMovieMapper.toPersistence(entity);

    data.movies.push(movie);

    await writeFile(this.DATA_PATH, JSON.stringify(data));
  }
}
