import { ActivatedRoute } from '@angular/router';
import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { MovieComponent } from './movie.component';
import { MovieDataAccessService } from './data-access/data-access.service';
import { of } from 'rxjs';

const mockMovie = {
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
};

const mockActivatedRoute = mockProvider(ActivatedRoute, {
  params: of(({ id: 'tt123' }))
});
const mockDataService = mockProvider(MovieDataAccessService, {
  getMovie: jest.fn().mockReturnValue(of({ ...mockMovie }))
});

describe('MovieComponent', () => {
  let spectator: Spectator<MovieComponent>;
  let component: MovieComponent;
  const createComponent = createComponentFactory({
    component: MovieComponent,
    imports: [],
    declarations: [],
    providers: [mockActivatedRoute, mockDataService],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    component.ngOnInit();
    expect(component.movieId).toBe('tt123')
    expect(component).toBeTruthy();
  });

  test('should have correct movieId ', () => {
    component.ngOnInit();
    expect(component.movieId).toBe('tt123')
  });
});
