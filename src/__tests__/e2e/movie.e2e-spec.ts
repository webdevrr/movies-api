import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';

import { AppModule } from '@/app.module';
import { MovieRepository } from '@/apps/movies/data-access/repository';
import { CreateMovieDto, MovieDto, MoviesListDto } from '@/apps/movies/domain/dtos';
import { CreateMovieUseCase, ListMoviesUseCase } from '@/apps/movies/use-cases';

import { MockMovieRepository } from '../mocks';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;
  let createMovieUseCase: CreateMovieUseCase;
  let listMoviesUseCase: ListMoviesUseCase;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(MovieRepository)
      .useClass(MockMovieRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();

    createMovieUseCase = moduleFixture.get<CreateMovieUseCase>(CreateMovieUseCase);
    listMoviesUseCase = moduleFixture.get<ListMoviesUseCase>(ListMoviesUseCase);
    movieRepository = moduleFixture.get<MovieRepository>(MovieRepository);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/POST api/v1/movies', () => {
    it('should return 201 and create movie if payload is correct', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Test Movie',
        genres: ['Action'],
        year: 2024,
        director: 'test director',
        runtime: 123
      };
      jest.spyOn(createMovieUseCase, 'execute');

      await request(app.getHttpServer()).post('/api/v1/movies').send(createMovieDto).expect(201);

      expect(createMovieUseCase.execute).toHaveBeenCalledWith(createMovieDto);

      const movies = await movieRepository.list();
      const createdMovie = movies.find(movie => movie.title === 'Test Movie');

      expect(createdMovie).toBeDefined();
    });

    it('should return 400 with proper message if genres are missing', async () => {
      const createMovieDto = {
        title: 'Test Movie',
        year: 2024,
        director: 'test director',
        runtime: 123
      };
      jest.spyOn(createMovieUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .post('/api/v1/movies')
        .send(createMovieDto)
        .expect(400);

      expect(response.body).toEqual({
        message: 'Genres not provided',
        error: 'Bad Request',
        statusCode: 400
      });
      expect(createMovieUseCase.execute).not.toHaveBeenCalled();
    });

    it('should return 400 with proper message if genres are empty array', async () => {
      const createMovieDto = {
        title: 'Test Movie',
        year: 2024,
        genres: [],
        director: 'test director',
        runtime: 123
      };
      jest.spyOn(createMovieUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .post('/api/v1/movies')
        .send(createMovieDto)
        .expect(400);

      expect(response.body).toEqual({
        message: ['genres should not be empty'],
        error: 'Bad Request',
        statusCode: 400
      });
      expect(createMovieUseCase.execute).not.toHaveBeenCalled();
    });

    it('should return 400 with proper message if genres are invalid', async () => {
      const createMovieDto = {
        title: 'Test Movie',
        year: 2024,
        director: 'test director',
        genres: ['InvalidGenre'],
        runtime: 123
      };
      jest.spyOn(createMovieUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .post('/api/v1/movies')
        .send(createMovieDto)
        .expect(400);

      expect(response.body).toEqual({
        message: 'Invalid genres provided',
        error: 'Bad Request',
        statusCode: 400
      });
      expect(createMovieUseCase.execute).not.toHaveBeenCalled();
    });

    it('should return 400 with proper message if genres are duplicated', async () => {
      const createMovieDto = {
        title: 'Test Movie',
        year: 2024,
        director: 'test director',
        genres: ['Action', 'Action'],
        runtime: 123
      };
      jest.spyOn(createMovieUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .post('/api/v1/movies')
        .send(createMovieDto)
        .expect(400);

      expect(response.body).toEqual({
        message: 'Duplicate genres provided',
        error: 'Bad Request',
        statusCode: 400
      });
      expect(createMovieUseCase.execute).not.toHaveBeenCalled();
    });

    it("should return 400 with proper message if title's length is over 255 characters ", async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Test Movie'.repeat(27),
        genres: ['Action'],
        year: 2024,
        director: 'test director',
        runtime: 123
      };
      jest.spyOn(createMovieUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .post('/api/v1/movies')
        .send(createMovieDto)
        .expect(400);

      expect(response.body).toEqual({
        message: ['title must be shorter than or equal to 255 characters'],
        error: 'Bad Request',
        statusCode: 400
      });
      expect(createMovieUseCase.execute).not.toHaveBeenCalled();
    });

    it("should return 400 with proper message if director's length is over 255 characters ", async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Test Movie',
        genres: ['Action'],
        year: 2024,
        director: 'test director'.repeat(27),
        runtime: 123
      };
      jest.spyOn(createMovieUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .post('/api/v1/movies')
        .send(createMovieDto)
        .expect(400);

      expect(response.body).toEqual({
        message: ['director must be shorter than or equal to 255 characters'],
        error: 'Bad Request',
        statusCode: 400
      });
      expect(createMovieUseCase.execute).not.toHaveBeenCalled();
    });

    it('should return 400 with proper message if runtime is of wrong type', async () => {
      const createMovieDto = {
        title: 'Test Movie',
        genres: ['Action'],
        year: 2024,
        director: 'test director',
        runtime: '123'
      };
      jest.spyOn(createMovieUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .post('/api/v1/movies')
        .send(createMovieDto)
        .expect(400);

      expect(response.body).toEqual({
        message: ['runtime must be a number conforming to the specified constraints'],
        error: 'Bad Request',
        statusCode: 400
      });
      expect(createMovieUseCase.execute).not.toHaveBeenCalled();
    });
  });

  describe('/GET api/v1/movies', () => {
    it('should return 200 with body containg random movie (no genres and duration provided)', async () => {
      const moviesListDto: MoviesListDto = {};

      jest.spyOn(listMoviesUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .get('/api/v1/movies')
        .query(moviesListDto)
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(listMoviesUseCase.execute).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should return 200 with body containg random movie win duration range (no genres but duration provided)', async () => {
      const moviesListDto: MoviesListDto = { duration: 100 };

      jest.spyOn(listMoviesUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .get('/api/v1/movies')
        .query(moviesListDto)
        .expect(200);
      const movie: MovieDto = response.body[0];

      expect(response.body).toHaveLength(1);
      expect(parseFloat(movie.runtime)).toBeGreaterThanOrEqual(moviesListDto.duration - 10);
      expect(parseFloat(movie.runtime)).toBeLessThanOrEqual(moviesListDto.duration + 10);
      expect(listMoviesUseCase.execute).toHaveBeenCalledWith(moviesListDto.duration, undefined);
    });

    it('should return movies containing at least one of the specified genres', async () => {
      const genres = ['Comedy', 'Fantasy', 'Crime'];
      const moviesListDto: MoviesListDto = { genres };

      jest.spyOn(listMoviesUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .get('/api/v1/movies')
        .query(moviesListDto)
        .expect(200);

      const movies = response.body;

      expect(movies).toHaveLength(70);

      movies.forEach((movie: MovieDto) => {
        const matchingGenres = movie.genres.filter(genre => genres.includes(genre));
        expect(matchingGenres.length).toBeGreaterThan(0);
      });

      expect(listMoviesUseCase.execute).toHaveBeenCalledWith(undefined, genres);
    });

    it('should return movies containing at least one of the specified genres and within the specified duration range', async () => {
      const genres = ['Comedy', 'Fantasy', 'Crime'];
      const duration = 100;
      const moviesListDto: MoviesListDto = { genres, duration };

      jest.spyOn(listMoviesUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .get('/api/v1/movies')
        .query(moviesListDto)
        .expect(200);

      const movies = response.body;

      movies.forEach((movie: MovieDto) => {
        const matchingGenres = movie.genres.filter(genre => genres.includes(genre));
        expect(matchingGenres.length).toBeGreaterThan(0);
        expect(parseFloat(movie.runtime)).toBeGreaterThanOrEqual(duration - 10);
        expect(parseFloat(movie.runtime)).toBeLessThanOrEqual(duration + 10);
      });

      expect(listMoviesUseCase.execute).toHaveBeenCalledWith(duration, genres);
    });

    it('should return an error if at least one genre is not valid', async () => {
      const genres = ['Comedy', 'InvalidGenre'];
      const duration = 120;
      const moviesListDto: MoviesListDto = { genres, duration };

      jest.spyOn(listMoviesUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .get('/api/v1/movies')
        .query(moviesListDto)
        .expect(400);

      expect(response.body).toEqual({
        message: 'Invalid genres provided',
        error: 'Bad Request',
        statusCode: 400
      });

      expect(listMoviesUseCase.execute).not.toHaveBeenCalled();
    });

    it('should return an error if genres are duplicated', async () => {
      const genres = ['Comedy', 'Comedy'];
      const duration = 120;
      const moviesListDto: MoviesListDto = { genres, duration };

      jest.spyOn(listMoviesUseCase, 'execute');

      const response = await request(app.getHttpServer())
        .get('/api/v1/movies')
        .query(moviesListDto)
        .expect(400);

      expect(response.body).toEqual({
        message: 'Duplicate genres provided',
        error: 'Bad Request',
        statusCode: 400
      });

      expect(listMoviesUseCase.execute).not.toHaveBeenCalled();
    });
  });
});
