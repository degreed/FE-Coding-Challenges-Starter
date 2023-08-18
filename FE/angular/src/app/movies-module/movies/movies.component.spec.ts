import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';
import { MoviesComponent } from './movies.component';
import { Store, StoreModule } from '@ngrx/store';
import { signal } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { getDecades, getMovies } from '../store/store.state';

const mockDecades = [2000];
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

const mockGetMovies = jest.fn().mockReturnValue(of({ Decades: mockDecades, Search: mockMovies }));
const mockGetFilteredMovies = jest.fn().mockReturnValue([mockMovies[0]]);
const mockDataService = mockProvider(DataService, {
  getMovies: mockGetMovies,
  getFilteredMovies: mockGetFilteredMovies
});
const storeValue = signal<number[] | MovieComplete[]>(mockDecades);
const mockStore = mockProvider(Store, {
  pipe: () => of(storeValue)
});

describe('MovieComponent', () => {
  let spectator: Spectator<MoviesComponent>;
  let component: MoviesComponent;
  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [],
    declarations: [],
    providers: [
      mockDataService,
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
    ],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    test('should set decades', () => {
      component.ngOnInit();
      expect(component.decades).toEqual(mockDecades);
    });
    test('should set movies array', () => {
      component.ngOnInit();
      expect(component.movies).toEqual(mockMovies);
    });
  });

  describe('displayMovies', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    describe('WHEN movies are defined', () => {
      beforeEach(() => {
        component.movies = mockMovies;
        component.displayMovies(2000);
      });
      test('should set filteredMovies', () => {
        expect(component.filteredMovies).toEqual([mockMovies[0]]);
      });
      describe('AND a decade is passed in', () => {
        beforeEach(() => {
          component.movies = mockMovies;
          component.displayMovies(2000);
        });
        test('should set currDecade', () => {
          expect(component.currDecade).toEqual(2000);
        });
      });
    });
    describe('WHEN movies are undefined', () => {
      test('should set filteredMovies to an empty array', () => {
        component.movies = [];
        spectator.detectComponentChanges();
        component.displayMovies();
        expect(component.filteredMovies).toEqual([]);
      });
    });
  });
});
