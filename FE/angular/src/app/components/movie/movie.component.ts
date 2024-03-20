import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap, Subscription } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  public movieId = '';
  private movieSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.movieSubscription = this.activatedRoute.params
      .pipe(
        tap(({ id }) => {
          this.movieId = id as string;
        }),
        mergeMap(({ id }) => {
          return this.dataService.getMovie(id as string);
        })
      )
      .subscribe((data) => (this.movie = data));
  }

  public ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }
}
