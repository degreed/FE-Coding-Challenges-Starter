import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { HttpService } from 'src/app/services/http.service';
interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: string;
  Year: string | number;
}

interface MovieDetails extends Movie {
  Actors: string;
  Director: string;
  Genre: string;
  Plot: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Writer: string;
}

export interface MovieComplete extends MovieDetails {
  Year: number;
}
@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  

  constructor(private http: HttpService) { }

  public getMovie(id: string): Observable<MovieComplete> {
    return this.http.get<MovieDetails>(`${Constants.serviceUrl}i=${id}`).pipe(
      map(({ Actors, Director, Genre, imdbID, Plot, Poster, Rated, Released, Runtime, Title, Type, Writer, Year }) => ({
        Actors,
        Director,
        Genre,
        imdbID,
        Plot,
        Poster: Poster.replace(Constants.posterUrl, Constants.replacePosterUrl),
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
}
