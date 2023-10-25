import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MovieComplete } from 'src/app/models/movie-complete';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movieId: string;
  private routeSubscription: Subscription;
  moviesDetail$: Observable<MovieComplete>;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.routeSubscription = this.activatedRoute.params?.subscribe((res) => {
      if (res) {
        this.movieId = res?.id as string;
      }
    });
    this.moviesDetail$ = this.dataService.getMovie(this.movieId);
  }

  public ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
