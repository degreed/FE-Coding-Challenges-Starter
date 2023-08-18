import { HttpClient } from '@angular/common/http';
import { mockProvider, SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from './data.service';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { getDecades, getMovies } from '../movies-module/store/store.state';

const mockGet = jest.fn().mockReturnValue(of([]));
const mockHttpClient = mockProvider(HttpClient, {
  get: mockGet
});

const serviceUrl = 'https://www.omdbapi.com/?apikey=f59b2e4b&';
const mockDecades = [2000, 2010];
const mockMovies = [
  {
    Title: 'Mock Movie',
    Year: 2000,
    Rated: 'G',
    Released: '01 Jan 2000',
    Runtime: '90 min',
    Genre: 'Mock Genre',
    Director: 'Director McMock',
    Writer: 'Writer Mock, Writer Mockerson',
    Actors: 'Actor McMock, Actor Mockerson',
    Plot: 'Mock movie plot summary.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbID: 'tt123',
    Type: 'movie'
  },
  {
    Title: 'Mock Movie 2',
    Year: 2011,
    Rated: 'G',
    Released: '01 Jan 2011',
    Runtime: '90 min',
    Genre: 'Mock Genre',
    Director: 'Director McMock',
    Writer: 'Writer Mock, Writer Mockerson',
    Actors: 'Actor McMock, Actor Mockerson',
    Plot: 'Mock movie plot summary.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbID: 'tt123',
    Type: 'movie'
  }
];

describe('DataService', () => {
  let spectator: SpectatorService<DataService>;
  let service: DataService;
  const createService = createServiceFactory({
    service: DataService,
    imports: [],
    declarations: [],
    providers: [
      mockHttpClient,
      provideMockStore({
        initialState: {
          Search: mockMovies,
          Decades: mockDecades
        },
        selectors: [
          {
            selector: getMovies,
            value: mockMovies
          },
          {
            selector: getDecades,
            value: mockDecades
          }
        ]
      })
    ]
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    spectator = createService();
    service = spectator.service;
  });

  test('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('getFilteredMovies', () => {
    describe('WHEN decade is undefined', () => {
      test('should return all movies', () => {
        expect(service.getFilteredMovies(mockMovies)).toEqual(mockMovies);
      });
    });
    describe('WHEN decade is defined', () => {
      test('should return only movies from that decade', () => {
        expect(service.getFilteredMovies(mockMovies, 2010)).toEqual([mockMovies[1]]);
      });
    });
  });

  describe('getMovie', () => {
    const mockMovie = mockMovies[0];
    let moviesSpy: jest.SpyInstance<Observable<unknown>>;
    beforeEach(() => {
      mockGet.mockReturnValueOnce(of(mockMovie));
      const httpClient = TestBed.get(HttpClient) as HttpClient;
      moviesSpy = jest.spyOn(httpClient, 'get');
      service.getMovie(mockMovie.imdbID);
    });
    test('should call http.get', () => {
      expect(moviesSpy).toBeCalledWith(`${serviceUrl}i=${mockMovie.imdbID}`);
    });
  });

  describe('getMovies', () => {
    let moviesSpy: jest.SpyInstance<Observable<unknown>>;
    beforeEach(() => {
      mockGet.mockReturnValueOnce(of({ Response: 'True', Search: mockMovies, totalResults: '2' }));
      // mockGet.mockReturnValue(of(mockMovies[1]));
      const httpClient = TestBed.get(HttpClient) as HttpClient;
      moviesSpy = jest.spyOn(httpClient, 'get');
      service.getMovies();
    });
    test('should call http.get', () => {
      expect(moviesSpy).toBeCalledWith(`${serviceUrl}s=Batman&type=movie`);
    });
  });
});
