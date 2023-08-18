import { createAction, props } from '@ngrx/store';
import { MovieComplete, MovieData } from '../../services/data.service';

export const getMoviesFromAPI = createAction('[Dashboard Component] getMoviesFromAPI');
export const addMovies = createAction('[Dashboard Component] AddMovies', props<{ movies: MovieData }>());
