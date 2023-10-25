import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MovieComplete } from 'src/app/models/movie-complete';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnDestroy, OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];
  private moviesSubscription: Subscription;

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.moviesSubscription = this.dataService
      .getMovies()
      .pipe(
        tap((data) => {
          this.decades = data.Decades;
          this.movies = data.Search;
          this.displayMovies();
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.moviesSubscription?.unsubscribe();
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
