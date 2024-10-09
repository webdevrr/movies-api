import { Test, TestingModule } from '@nestjs/testing';

import { MovieRepository } from '@/apps/movies/data-access/repository';
import { MovieEntity } from '@/apps/movies/domain';
import { CreateMovieDto } from '@/apps/movies/domain/dtos';
import { CreateMovieUseCase } from '@/apps/movies/use-cases';

import { MockMovieRepository } from '../../mocks';

describe('CreateMovieUseCase', () => {
  let useCase: CreateMovieUseCase;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateMovieUseCase, { provide: MovieRepository, useClass: MockMovieRepository }]
    }).compile();

    useCase = module.get<CreateMovieUseCase>(CreateMovieUseCase);
    movieRepository = module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create movie with proper id', async () => {
    const moviesBefore = await movieRepository.list();
    expect(moviesBefore).toHaveLength(146);

    const createMovieDto: CreateMovieDto = {
      title: 'The Godfather',
      genres: ['Crime', 'Drama'],
      year: 1972,
      runtime: 175,
      director: 'Francis Ford Coppola',
      actors: 'Marlon Brando, Al Pacino',
      plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      posterUrl: 'http://example.com/godfather.jpg'
    };
    const lastMovieId = moviesBefore[moviesBefore.length - 1].id;
    const movie = new MovieEntity(
      createMovieDto.title,
      createMovieDto.genres,
      String(createMovieDto.year),
      String(createMovieDto.runtime),
      createMovieDto.director,
      createMovieDto.actors,
      createMovieDto.plot,
      createMovieDto.posterUrl,
      lastMovieId + 1
    );

    await useCase.execute(createMovieDto);

    const moviesAfter = await movieRepository.list();

    expect(moviesAfter).toHaveLength(147);

    expect(moviesAfter[moviesAfter.length - 1]).toEqual(movie);
  });
});
