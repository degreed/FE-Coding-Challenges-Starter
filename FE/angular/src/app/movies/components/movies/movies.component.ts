import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements  OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];
  protected ngUnsubscribe$: Subject<void> = new Subject<void>();


  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.dataService.getMovies().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data: any) => {
        this.decades = data.Decades;
        this.movies = data.Search;
        this.displayMovies();
    }
    );
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
