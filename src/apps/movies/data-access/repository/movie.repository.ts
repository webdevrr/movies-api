import { Repository } from '@/core/base';

import { MovieEntity } from '../../domain';
import { Genre } from '../../types';

export abstract class MovieRepository implements Repository<MovieEntity> {
  abstract list(duration?: number, genres?: Genre[]): Promise<MovieEntity[]>;
  abstract create(entity: MovieEntity): Promise<void>;
}
