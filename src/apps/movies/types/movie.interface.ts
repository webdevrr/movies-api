import { Genre } from './genre.enum';

export interface Movie {
  id: number;
  title: string;
  year: number;
  runtime: string;
  genres: Genre[];
  director: string;
  actors?: string;
  plot?: string;
  posterUrl?: string;
}
