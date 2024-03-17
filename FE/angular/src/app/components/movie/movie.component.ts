import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  private movieSubscription: Subscription;
  public showError: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id) {
        this.getMovieDetails(id);
      } else {
        this.showError = true;
      }
    });
  }

  private getMovieDetails(movieId: string) {
    this.movieSubscription = this.dataService.getMovie(movieId).subscribe((data) => (this.movie = data));
  }

  public ngOnDestroy(): void {
    if (this.movieSubscription) this.movieSubscription.unsubscribe();
  }
}
