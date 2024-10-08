export class MovieDto {
  readonly id: number;
  readonly title: string;
  readonly year: string;
  readonly runtime: string;
  readonly genres: string[];
  readonly director: string;
  readonly actors?: string;
  readonly plot?: string;
  readonly posterUrl?: string;
}
