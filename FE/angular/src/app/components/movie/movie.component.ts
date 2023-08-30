import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, MovieComplete } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  public movieId: string;
  private movieSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.movieSubscription = this.dataService
      .getMovie(this.movieId)
      .subscribe((data: MovieComplete) => (this.movie = data));
  }

  public ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }
}
