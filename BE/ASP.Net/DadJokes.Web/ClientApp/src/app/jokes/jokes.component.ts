import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Joke } from '../random-joke/random-joke.component';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
})
export class JokesComponent {
  public jokes$!: Observable<Jokes>;
  public jokeTableConfig: JokeTableConfig[] = [
    { type: 'short', prop: 'shortJokes' },
    { type: 'medium', prop: 'mediumJokes' },
    { type: 'long', prop: 'longJokes' },
  ];
  public searchTerm: string = '';

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  public onSubmit(form: NgForm): void {
    // prevent errors on empty search terms
    if (!form.value.searchTerm) {
      this.jokes$ = EMPTY;
      return;
    }
    // otherwise, continue
    this.jokes$ = this.http
      .get<Jokes>(`${this.baseUrl}api/Jokes?term=${form.value.searchTerm}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }
}

interface Jokes {
  shortJokes: Joke[];
  mediumJokes: Joke[];
  longJokes: Joke[];
}

interface JokeTableConfig {
  type: string;
  prop: keyof Jokes;
}
