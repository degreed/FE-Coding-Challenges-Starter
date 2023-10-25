import { Spectator, createComponentFactory, mockProvider } from '@ngneat/spectator';
import { DataService } from '../../services/data.service';
import { MoviesComponent } from './movies.component';
import { of } from 'rxjs';
import { mockDecades, mockMovies } from '../../mockData';
import { fakeAsync, tick } from '@angular/core/testing';

const mockGetMovies = jest.fn().mockReturnValue(of({ Decades: mockDecades, Search: mockMovies }));

const mockDataService = mockProvider(DataService, {
  getMovies: mockGetMovies,
});

describe('MoviesComponent', () => {
  let spectator: Spectator<MoviesComponent>;
  let component: MoviesComponent;

  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [],
    providers: [mockDataService],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(fakeAsync(() => {
      component.ngOnInit();
      tick(); // Wait for observables to complete
    }));

    test('should set decades', () => {
      expect(component.decades).toEqual(mockDecades);
    });

    test('should set movies array', () => {
      expect(component.movies$).toEqual(mockMovies);
    });
  });
});
