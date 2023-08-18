import { createAction, props } from '@ngrx/store';
import { MovieData } from '../../services/data.service';

export const getMoviesFromAPI = createAction('[Dashboard Component] GetMoviesFromAPI');
export const addMovies = createAction('[Dashboard Component] AddMovies', props<{ movies: MovieData }>());
export const setBreakpoint = createAction('[Dashboard Component] SetBreakPoint', props<{ isHandset: boolean }>());
