import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDataLibService, MovieComplete } from 'movie-data-lib';

@Component({
  selector: 'app-movies',
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnDestroy, OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];
  private moviesSubscription: Subscription;

  constructor(private dataService: MovieDataLibService) {}

  public ngOnInit(): void {
    this.moviesSubscription = this.dataService.getMovies().subscribe((data) => {
      this.decades = data.Decades;
      this.movies = data.Search;
      this.displayMovies();
    });
  }

  public ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
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
