import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { MovieRepository } from '../../data-access/repository';

@ValidatorConstraint({ name: 'genres', async: true })
@Injectable()
export class GenresValidator implements ValidatorConstraintInterface {
  constructor(private readonly movieRepository: MovieRepository) {}

  async validate(values: string[] | string): Promise<boolean> {
    const availableGenres = await this.movieRepository.listGenres();
    let isValid: boolean;

    if (!values) {
      throw new BadRequestException('Genres not provided');
    }
    if (typeof values === 'string') {
      isValid = availableGenres.includes(values);
    }

    if (Array.isArray(values)) {
      const hasDuplicates = new Set(values).size !== values.length;
      if (hasDuplicates) {
        throw new BadRequestException('Duplicate genres provided');
      }
      isValid = values.every(value => availableGenres.includes(value));
    }

    if (!isValid) {
      throw new BadRequestException('Invalid genres provided');
    }

    return isValid;
  }
}
