import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MovieComplete } from 'src/app/models/data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie$: Observable<MovieComplete>;
  private movieSubscription: Subscription;
  public showError: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id) {
        this.movie$ = this.dataService.getMovie(id);
      } else {
        this.showError = true;
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.movieSubscription) this.movieSubscription.unsubscribe();
  }
}
