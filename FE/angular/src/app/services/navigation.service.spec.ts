import { Router } from '@angular/router';
import { SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { NavigationService } from './navigation.service';
import { TestBed } from '@angular/core/testing';


describe('NavigationService', () => {
  let spectator: SpectatorService<NavigationService>;
  let service: NavigationService;
  let router:Router;

  const createService = createServiceFactory({
    service: NavigationService,
    imports: [],
    declarations: [],
    providers: []
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    spectator = createService();
    service = spectator.service;
    router = TestBed.get(Router)
  });

  test('should create the component', () => {
    expect(service).toBeTruthy();
  });

  describe('goTo', () => {
    test('should pass single argument', () => {
      const navigateSpy = jest.spyOn(router,'navigate');
      service.goTo('/');
      expect(navigateSpy).toBeCalledWith(['/']);
    });
    test('should pass multiple arguments', () => {
      const navigateSpy = jest.spyOn(router,'navigate');
      service.goTo('/movie', 'tt123');
      expect(navigateSpy).toBeCalledWith(['/movie', 'tt123']);
    });
    test('should throw errors', (done) => {
      const mockError = 'mock error';
      const navigateSpy = jest.spyOn(router,'navigate').mockRejectedValueOnce(mockError);
      service.goTo('/').then(
        () => fail('Error not thrown.'),
        () => {
          done();
        }
      );
    });
  });
});
