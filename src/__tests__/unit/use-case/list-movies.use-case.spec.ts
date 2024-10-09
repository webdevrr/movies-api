import { Test, TestingModule } from '@nestjs/testing';

import { MovieRepository } from '@/apps/movies/data-access/repository';
import { MovieDto } from '@/apps/movies/domain/dtos';
import { ListMoviesUseCase } from '@/apps/movies/use-cases';

import { MockMovieRepository } from '../../mocks';

const expectedMovie: MovieDto = {
  id: expect.any(Number),
  title: expect.any(String),
  year: expect.any(String),
  runtime: expect.any(String),
  genres: expect.any(Array),
  director: expect.any(String),
  actors: expect.any(String),
  plot: expect.any(String),
  posterUrl: expect.any(String)
};

describe('ListMoviesUseCase', () => {
  let useCase: ListMoviesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListMoviesUseCase, { provide: MovieRepository, useClass: MockMovieRepository }]
    }).compile();

    useCase = module.get<ListMoviesUseCase>(ListMoviesUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return random movie when no duration and no genres are provided', async () => {
    const result = await useCase.execute();
    expect(result).toHaveLength(1);
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining(expectedMovie)]));
  });

  it('should return random movie in duration range if only duration is provided', async () => {
    const result = await useCase.execute(100);
    expect(result).toHaveLength(1);
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining(expectedMovie)]));
  });

  it('should filter movies by genres when only genres are provided', async () => {
    const result = await useCase.execute(undefined, ['Action']);
    expect(result).toHaveLength(18);
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining(expectedMovie)]));
  });

  it('should filter movies by duration and genres when both are provided', async () => {
    const result = await useCase.execute(120, ['Action']);
    expect(result).toHaveLength(4);
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining(expectedMovie)]));
  });
});
