import { Entity } from '@/core/base';

import { Genre } from '../types';

export class MovieEntity extends Entity {
  private _genres: Genre[];
  private _title: string;
  private _year: number;
  private _runtime: number;
  private _director: string;
  private _actors?: string;
  private _plot?: string;
  private _posterUrl?: string;

  constructor(
    title: string,
    genres: Genre[],
    year: number,
    runtime: number,
    director: string,
    actors?: string,
    plot?: string,
    posterUrl?: string
  ) {
    super();
    this.title = title;
    this.genres = genres;
    this.year = year;
    this.runtime = runtime;
    this.director = director;
    this.actors = actors;
    this.plot = plot;
    this.posterUrl = posterUrl;
  }

  set genres(value: Genre[]) {
    this._genres = value;
  }

  get genres() {
    return this._genres;
  }

  set title(value: string) {
    this._title = value;
  }

  get title() {
    return this._title;
  }

  set year(value: number) {
    this._year = value;
  }

  get year() {
    return this._year;
  }

  set runtime(value: number) {
    this._runtime = value;
  }

  get runtime() {
    return this._runtime;
  }

  set director(value: string) {
    this._director = value;
  }

  get director() {
    return this._director;
  }

  set actors(value: string) {
    this._actors = value;
  }

  get actors() {
    return this._actors;
  }

  set plot(value: string) {
    this._plot = value;
  }

  get plot() {
    return this._plot;
  }

  set posterUrl(value: string) {
    this._posterUrl = value;
  }

  get posterUrl() {
    return this._posterUrl;
  }
}
