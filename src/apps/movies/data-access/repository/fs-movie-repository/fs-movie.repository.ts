import { MovieEntity } from '@/apps/movies/domain';

import { MovieRepository } from '../movie.repository';

export class FsMovieRepository implements MovieRepository {
  create(entity: MovieEntity): void {
    console.log(entity);
  }
}
