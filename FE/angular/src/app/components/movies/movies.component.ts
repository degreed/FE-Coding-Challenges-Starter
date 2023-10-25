import { Component, OnInit } from '@angular/core';
import { tap, Observable, map } from 'rxjs';
import { DataService } from '../../services/data.service';
import { MovieComplete } from '../../models';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public movies$: Observable<MovieComplete[]> | null = null;

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.movies$ = this.dataService.getMovies().pipe(
      map(movieData => {
        this.decades = movieData.Decades ?? [];
        return movieData.Search ?? null;
      }),
    );
  }

  public updateCurrDecade(decade?: number): void {
    this.currDecade = decade;
  }
}
