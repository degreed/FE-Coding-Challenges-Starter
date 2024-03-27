import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { MovieComplete } from 'src/app/features/movies/interfaces/movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  public movieId: string | null;

  public destroy$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.dataService
        .getMovie(this.movieId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: MovieComplete) => (this.movie = data),
          error: (error) => {
            console.error('Failed to fetch movie data', error);
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
