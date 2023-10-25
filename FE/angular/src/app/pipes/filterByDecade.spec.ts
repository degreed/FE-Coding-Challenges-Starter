import { FilterByDecadePipe } from './filterByDecade.pipe';
import { mockDecades, mockMovies } from '../mockData';

describe('FilterByDecadePipe', () => {
  let pipe: FilterByDecadePipe;

  beforeEach(() => {
    pipe = new FilterByDecadePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter movies by decade when decade is provided', () => {
    const result = pipe.transform(mockMovies, mockDecades[0]);

    expect(result.length).toBe(1);
    expect(result[0].Title).toBe('Mock Movie');
  });

  it('should return all movies when decade is not provided', () => {
    const result = pipe.transform(mockMovies, undefined);

    expect(result.length).toBe(2);
  });

  // Add more test cases as needed...
});
