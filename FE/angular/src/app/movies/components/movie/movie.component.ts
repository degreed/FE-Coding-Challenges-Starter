import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  public movie: MovieComplete;
  public movieId = '';
  private movieSubscription: any;
  protected ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.movieId = params['id'] //log the value of id
    });
    this.dataService.getMovie(this.movieId).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data: any) => (this.movie = data));
  }
}
