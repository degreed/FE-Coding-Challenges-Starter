import { HttpClient } from '@angular/common/http';
import { mockProvider, SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { DataService } from './data.service';

import { mockMovies } from '../mockData';
import APP_CONSTANTS from '../constants';

const mockGet = jest.fn().mockReturnValue(of([]));
const mockHttpClient = mockProvider(HttpClient, {
  get: mockGet
});

const serviceUrl = APP_CONSTANTS.serviceUrl;

describe('DataService', () => {
  let spectator: SpectatorService<DataService>;
  let service: DataService;
  const createService = createServiceFactory({
    service: DataService,
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

  describe('getMovies', () => {
    beforeEach(() => {
      mockGet.mockReturnValueOnce(of({ Response: 'True', Search: mockMovies, totalResults: '2' }));
      mockGet.mockReturnValue(of(mockMovies[1]));
      service.getMovies();
    });
    test('should call http.get', () => {
      expect(mockGet).toBeCalledWith(`${serviceUrl}s=Batman&type=movie`);
    });
  });
});
