import { MovieEntity } from '@/apps/movies/domain';
import { Movie } from '@/apps/movies/types';
import { PersistenceMapper } from '@/core/base';

export class FsMovieMapper extends PersistenceMapper<MovieEntity, Movie> {
  toEntity(param: Movie): MovieEntity {
    const { title, genres, year, runtime, director, actors, plot, posterUrl, id } = param;
    return new MovieEntity(title, genres, year, runtime, director, actors, plot, posterUrl, id);
  }

  toPersistence(entity: MovieEntity): Movie {
    const { id, title, year, runtime, genres, director, posterUrl, plot, actors } = entity;
    return {
      id,
      title,
      year,
      runtime,
      genres,
      director,
      posterUrl,
      plot,
      actors
    };
  }
}
