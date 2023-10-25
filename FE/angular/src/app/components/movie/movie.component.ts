import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap, switchMap } from 'rxjs';
import { DataService } from '../../services/data.service';
import { MovieComplete } from '../../models';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  public movie$: Observable<MovieComplete>;
  private movieId: string = '';

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.movie$ = this.activatedRoute.params.pipe(
      tap(({ id }) => (this.movieId = id)),
      switchMap(({ id }) => this.dataService.getMovie(id))
    );
  }
}
