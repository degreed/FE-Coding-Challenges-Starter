import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, combineLatest, takeUntil, tap } from 'rxjs';
import { DataService, MovieComplete, MovieData } from '../../services/data.service';
import { Store, select } from '@ngrx/store';
import { getBreakpoint, getMovies } from '../store/store.state';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  public movieId: string;
  public isHandset$: Observable<boolean>;
  private destroySubject$: Subject<boolean> = new Subject(); //this subject is for effeciently unsubscribing the obseravables on destroy of the component

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private store: Store<MovieData>
  ) {}

  public ngOnInit() {
    const params$: Observable<Params> = this.activatedRoute.params;
    const movies$: Observable<MovieComplete[]> = this.store.pipe(select(getMovies));
    combineLatest([params$, movies$])
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: (resp) => {
          this.movieId = resp[0]?.id as string;
          this.movie = resp[1].find((movie) => movie.imdbID === this.movieId) as MovieComplete;
        }
      });

    this.isHandset$ = this.store.pipe(select(getBreakpoint), takeUntil(this.destroySubject$));
  }

  public isSmallScreen(isHandset: boolean | null) {
    return !!isHandset;
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next(true); //doing this will unsubscribe all the observables of this component
    this.destroySubject$.complete(); //terminating destroy subject
  }
}
