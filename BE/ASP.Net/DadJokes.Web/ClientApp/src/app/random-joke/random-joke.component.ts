import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-random-joke',
  templateUrl: './random-joke.component.html',
})
export class RandomJokeComponent {
  public joke$!: Observable<Joke>;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  public getRandomJoke(): void {
    this.joke$ = this.http.get<Joke>(`${this.baseUrl}api/Jokes/random`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}

export interface Joke {
  id: string;
  text: string;
}
