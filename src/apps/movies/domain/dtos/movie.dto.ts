import { Genre } from '../../types';

export class MovieDto {
  readonly id: number;
  readonly title: string;
  readonly year: number;
  readonly runtime: number;
  readonly genres: Genre[];
  readonly director: string;
  readonly actors?: string;
  readonly plot?: string;
  readonly posterUrl?: string;
}
