import { HttpClient } from '@angular/common/http';
import { mockProvider, SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { MovieDataAccessService } from './data-access.service';

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

describe('MovieDataAccessService', () => {
  let spectator: SpectatorService<MovieDataAccessService>;
  let service: MovieDataAccessService;
  const createService = createServiceFactory({
    service: MovieDataAccessService,
    imports: [],
    declarations: [],
    providers: [mockHttpClient]
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


  describe('getMovie', () => {
    const mockMovie = mockMovies[0];
    beforeEach(() => {
      mockGet.mockReturnValueOnce(of(mockMovie));
      service.getMovie(mockMovie.imdbID);
    });
    test('should call http.get', () => {
      expect(mockGet).toBeCalledWith(`${serviceUrl}i=${mockMovie.imdbID}`);
    });
  });
});
