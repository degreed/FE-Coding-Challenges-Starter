import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { MovieComplete, MovieData } from 'src/app/features/movies/interfaces/movie.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnDestroy, OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];

  public destroy$ = new Subject();

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.dataService
      .getMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: MovieData) => {
          this.decades = data.Decades;
          this.movies = data.Search;
          this.displayMovies();
        },
        error: (error) => {
          console.error('Failed to fetch movies data', error);
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public displayMovies(decade?: number): void {
    if (!this.movies?.length) {
      this.filteredMovies = [];
      return;
    }

    this.currDecade = decade;
    this.filteredMovies = this.dataService.getFilteredMovies(this.movies, decade);
  }
}
