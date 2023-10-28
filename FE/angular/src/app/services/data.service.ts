import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MovieComplete, MovieData, MovieDetails, SearchResults } from '../models';
import { API_URL_CONST } from '../constants';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private decades: number[] = [];
  private storedMovies: MovieData = { Search: [], Decades: [] };

  constructor(private http: HttpClient) {}

  public getMovie(id: string): Observable<MovieComplete> {
    return this.http.get<MovieDetails>(`${API_URL_CONST.serviceUrl}i=${id}`).pipe(
      map(({ Actors, Director, Genre, imdbID, Plot, Poster, Rated, Released, Runtime, Title, Type, Writer, Year }) => ({
        Actors,
        Director,
        Genre,
        imdbID,
        Plot,
        Poster: Poster.replace(API_URL_CONST.posterUrl, API_URL_CONST.replacePosterUrl),
        Rated,
        Released,
        Runtime,
        Title,
        Type,
        Writer,
        Year: parseInt(Year as string)
      }))
    );
  }

  public getMovies(): Observable<MovieData> {
    if (this.storedMovies && this.storedMovies.Search.length) {
      return of(this.storedMovies);
    }

    return this.http.get<SearchResults>(`${API_URL_CONST.serviceUrl}s=Batman&type=movie`).pipe(
      mergeMap(({ Search }) =>
        forkJoin(
          Search.map(({ imdbID, Year }) => {
            // add decade to decades
            const decade = Math.ceil(parseInt(Year as string) / 10) * 10 - 10;
            if (this.decades.indexOf(decade) < 0) {
              this.decades.push(decade);
            }

            return this.getMovie(imdbID);
          })
        )
      ),
      map((Search) => {
        Search = Search.sort(({ Year: year1 }: MovieComplete, { Year: year2 }: MovieComplete) => year1 - year2);
        this.decades.sort((a, b) => a - b);
        this.storedMovies = { Search, Decades: this.decades };

        return this.storedMovies;
      })
    );
  }
}
