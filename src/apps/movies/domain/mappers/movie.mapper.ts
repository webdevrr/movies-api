import { Mapper } from '@/core/base';

import { MovieDto } from '../dtos';
import { MovieEntity } from '../movie.entity';

export class MovieMapper extends Mapper<MovieEntity, MovieDto> {
  public toDto(entity: MovieEntity): MovieDto {
    return {
      id: entity.id,
      title: entity.title,
      year: entity.year,
      runtime: entity.runtime,
      genres: entity.genres,
      director: entity.director,
      plot: entity.plot,
      actors: entity.actors,
      posterUrl: entity.posterUrl
    };
  }
}
