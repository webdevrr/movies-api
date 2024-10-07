import { Injectable } from '@nestjs/common';

import { UseCase } from '@/core/base';

import { MovieRepository } from '../data-access/repository';

@Injectable()
export class CreateMovieUseCase implements UseCase<void> {
  constructor(private readonly movieRepository: MovieRepository) {}

  public async execute(): Promise<void> {}
}
