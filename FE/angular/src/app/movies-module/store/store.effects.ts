import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService, MovieData } from 'src/app/services/data.service';
import { addMovies, getMoviesFromAPI } from './store.action';
import { EMPTY, catchError, map, mergeMap, tap } from 'rxjs';

@Injectable()
export class RootEffects {
  /*
  To handle the behaviour of the Effect when different Action instances 
  occurs on the same effect you can change mergeMap to other operators
  */

  // effect from simulating an API call success
  getMockDataEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMoviesFromAPI),
      mergeMap((action) => {
        return this.dataService.getMovies().pipe(
          map((res) => addMovies({ movies: res })),
          catchError((error) => EMPTY)
        );
      })
    )
  );

  constructor(private actions$: Actions, private dataService: DataService) {}
}
