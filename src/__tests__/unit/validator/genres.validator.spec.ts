import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { MovieRepository } from '@/apps/movies/data-access/repository';
import { GenresValidator } from '@/apps/movies/utils/validators';

describe('GenresValidator', () => {
  let validator: GenresValidator;

  const mockGenres = ['Action', 'Comedy', 'Drama'];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresValidator,
        {
          provide: MovieRepository,
          useValue: {
            listGenres: jest.fn().mockResolvedValue(mockGenres)
          }
        }
      ]
    }).compile();

    validator = module.get<GenresValidator>(GenresValidator);
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  it('should validate a single genre', async () => {
    await expect(validator.validate('Action')).resolves.toBe(true);
  });

  it('should validate multiple genres', async () => {
    await expect(validator.validate(['Action', 'Comedy'])).resolves.toBe(true);
  });

  it('should throw an error for invalid genres', async () => {
    await expect(validator.validate('InvalidGenre')).rejects.toThrow(BadRequestException);
  });

  it('should throw an error for duplicate genres', async () => {
    await expect(validator.validate(['Action', 'Action'])).rejects.toThrow(BadRequestException);
  });

  it('should throw an error for invalid genres in array', async () => {
    await expect(validator.validate(['Action', 'InvalidGenre'])).rejects.toThrow(
      BadRequestException
    );
  });
});
