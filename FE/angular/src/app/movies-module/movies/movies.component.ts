import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { DataService, MovieComplete } from '../../services/data.service';
import { Store, select } from '@ngrx/store';
import { MoviesInterFace } from '../store/store.modal';
import { getDecades, getMovies } from '../store/store.state';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { setBreakpoint } from '../store/store.action';

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
  public isHandset: boolean;
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  @Input() moviesData: { Decades: number[]; Search: MovieComplete[] }; //Binding route data to component input
  destroySubject: Subject<boolean> = new Subject();
  constructor(private dataService: DataService, private store: Store<MoviesInterFace>) {}

  public ngOnInit(): void {
    this.monitorBreakpointChanges();
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

  // tracking loop elements by movie.imdbID , helps in efficiently handling re-rendering of the html elements
  public trackMoviesBy(index: number, movie: MovieComplete) {
    return movie.imdbID;
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

  //Watcher for screen size for responsiveness
  private monitorBreakpointChanges() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroySubject))
      .subscribe({
        next: ({ matches }) => {
          this.isHandset = matches;
          this.store.dispatch(setBreakpoint({ isHandset: this.isHandset }));
        }
      });
  }
}
