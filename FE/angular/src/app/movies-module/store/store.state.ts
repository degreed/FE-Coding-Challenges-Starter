import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { addMovies, setBreakpoint } from './store.action';
import { MoviesInterFace } from './store.modal';

export const initialState: MoviesInterFace = {
  Search: [],
  Decades: [],
  isHandset: false
};

export const reducers = createReducer(
  initialState,
  on(addMovies, (state: MoviesInterFace, { movies }) => {
    // console.log(movies);
    state = {
      ...state,
      Search: movies.Search,
      Decades: movies.Decades
    };
    return state;
  }),
  on(setBreakpoint, (state: MoviesInterFace, { isHandset }) => {
    // console.log(movies);
    state = {
      ...state,
      isHandset
    };
    return state;
  })
);
export const moviesState = createFeatureSelector<MoviesInterFace>('movies');
export const getMovies = createSelector(moviesState, (state: MoviesInterFace) => state.Search);
export const getDecades = createSelector(moviesState, (state: MoviesInterFace) => state.Decades);
export const getBreakpoint = createSelector(moviesState, (state: MoviesInterFace) => state.isHandset);
