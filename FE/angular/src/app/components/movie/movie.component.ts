import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  public movieId = '';
  private movieSubscription: any;
  private subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  public ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => (this.movieId = id));
    this.movieSubscription = this.dataService.getMovie(this.movieId).subscribe((data) => (this.movie = data));
  }

  public ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }
}
