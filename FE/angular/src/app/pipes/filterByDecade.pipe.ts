import { Pipe, PipeTransform } from '@angular/core';
import { MovieComplete } from '../models';

@Pipe({
  name: 'filterByDecade',
})
export class FilterByDecadePipe implements PipeTransform {
  transform(movies: MovieComplete[], decade?: number): MovieComplete[] {
    if (!decade) {
      return movies;
    }

    const decadeLimit = decade + 10;
    return movies.filter((movie) => movie.Year >= decade && movie.Year < decadeLimit);
  }
}
