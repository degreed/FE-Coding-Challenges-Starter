import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MovieComplete } from 'src/app/models';
const imdbBaseLink = 'https://www.imdb.com/title/';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit, OnDestroy {
  public movie: MovieComplete;
  private destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(({ id }) => this.dataService.getMovie(id as string))
      )
      .subscribe((movie) => (this.movie = movie));
  }

  public navigateTo(id: string) {
    window.open(imdbBaseLink + id, 'imdbWindow');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
