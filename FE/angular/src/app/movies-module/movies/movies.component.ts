import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService, MovieComplete } from '../../services/data.service';
import { Store, select } from '@ngrx/store';
import { MoviesInterFace } from '../store/store.modal';
import { getDecades, getMovies } from '../store/store.state';
import { Subject, combineLatest, takeUntil } from 'rxjs';

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
  @Input() moviesData: { Decades: number[]; Search: MovieComplete[] }; //Binding route data to component input
  destroySubject: Subject<boolean> = new Subject();
  constructor(private dataService: DataService, private store: Store<MoviesInterFace>) {}

  public ngOnInit(): void {
    const movies$ = this.store.pipe(select(getMovies));
    const decades$ = this.store.pipe(select(getDecades));
    combineLatest([movies$, decades$])
      .pipe(takeUntil(this.destroySubject))
      .subscribe({
        next: (resp) => {
          this.movies = resp[0];
          this.decades = resp[1];
          this.dataService.setMovies(this.movies, this.decades);
          this.displayMovies();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
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
