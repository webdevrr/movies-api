import { Repository } from '@/core/base';

import { MovieEntity } from '../../domain';

export abstract class MovieRepository implements Repository<MovieEntity> {
  abstract create(entity: MovieEntity): void;
}
