import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, shareReplay } from 'rxjs/operators';

import APP_CONSTANTS from '../constants';
import { Movie, MovieComplete, MovieData, MovieDetails, SearchResults } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private decades: number[] = [];
  private storedMovies: MovieData = { Search: [], Decades: [] };

  constructor(private http: HttpClient) {}

  getMovie(id: string): Observable<MovieComplete> {
    return this.http.get<MovieDetails>(`${APP_CONSTANTS.serviceUrl}i=${id}`).pipe(
      map((details: MovieDetails) => ({
        ...details,
        Year: parseInt(details.Year as string),
        Poster: details.Poster.replace(APP_CONSTANTS.posterUrl, APP_CONSTANTS.replacePosterUrl)
      })),
      catchError(error => {
        console.error('HTTP request error:', error);
        return throwError(error);
      })
    );
  }

  public getMovies(): Observable<MovieData> {
    if (this.storedMovies && this.storedMovies.Search.length) {
      return of(this.storedMovies);
    }

    return this.http.get<SearchResults>(`${APP_CONSTANTS.serviceUrl}s=Batman&type=movie`).pipe(
      mergeMap(({ Search }) => {
        const imdbIDs = Search.map(({ imdbID }) => imdbID);
        return this.fetchMoviesDetails(imdbIDs).pipe(
          map((movies) => {
            const decadesSet = new Set<number>();

            // Calculate decades and eliminate duplicates
            movies.forEach((movie: Movie) => {
              const decade = Math.ceil(parseInt(movie.Year.toString(), 10) / 10) * 10 - 10;
              decadesSet.add(decade);
            });

            // Sort the decades
            this.decades = Array.from(decadesSet).sort((a, b) => a - b);

            // Sort movies by year
            const sortedMovies = movies.sort((a, b) => parseInt(a.Year.toString(), 10) - parseInt(b.Year.toString(), 10));

            this.storedMovies = { Search: sortedMovies, Decades: this.decades };
            return this.storedMovies;
          })
        );
      }),
      catchError((error) => {
        console.error('HTTP request error:', error);
        return throwError(error); // Rethrow the error
      }),
      shareReplay(1) // Cache the result to avoid making the same HTTP request multiple times
    );
  }

  private fetchMoviesDetails(imdbIDs: string[]): Observable<MovieComplete[]> {
    return forkJoin(
      imdbIDs.map((imdbID) => this.getMovie(imdbID))
    );
  }
}
