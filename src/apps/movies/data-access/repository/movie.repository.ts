import { Repository } from '@/core/base';

import { MovieEntity } from '../../domain';

export abstract class MovieRepository implements Repository<MovieEntity> {
  abstract list(): Promise<MovieEntity[]>;
  abstract create(entity: MovieEntity): Promise<number>;
  abstract listGenres(): Promise<string[]>;
}
