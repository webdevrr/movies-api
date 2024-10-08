import { Repository } from '@/core/base';

import { MovieEntity } from '../../domain';

export abstract class MovieRepository implements Repository<MovieEntity> {
  abstract list(duration?: number, genres?: string[]): Promise<MovieEntity[]>;
  abstract create(entity: MovieEntity): Promise<void>;
}
