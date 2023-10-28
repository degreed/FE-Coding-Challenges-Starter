import { Pipe, PipeTransform } from '@angular/core';
import { MovieComplete } from '../models';

@Pipe({
  name: 'decadeFilter'
})
export class DecadeFilterPipe implements PipeTransform {
  transform(movies: MovieComplete[], decade?: number): MovieComplete[] {
    if (!decade) {
      return movies;
    }

    const startYear = this.calculateStartYear(decade);
    const endYear = startYear + 10;

    return movies.filter((movie) => this.isInDecade(movie.Year, startYear, endYear));
  }

  private calculateStartYear(decade: number): number {
    const currentYear = new Date().getFullYear();
    const absoluteDecade = Math.abs(decade);
    return decade >= 0 ? decade : currentYear - absoluteDecade * 10;
  }

  private isInDecade(movieYear: number, startYear: number, endYear: number): boolean {
    return movieYear >= startYear && movieYear < endYear;
  }
}
