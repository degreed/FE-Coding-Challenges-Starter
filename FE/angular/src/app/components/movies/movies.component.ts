import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';
import { MovieComplete } from 'src/app/models';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit, OnDestroy {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private dataService: DataService, private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadData(): void {
    this.dataService
      .getMovies()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.decades = data.Decades;
        this.movies = data.Search;
        this.displayMovies();
      });
  }

  public displayMovies(decade?: number): void {
    if (!this.movies?.length) {
      this.filteredMovies = [];
      return;
    }
    this.currDecade = decade;
  }

  public navigateTo(id: string) {
    this.navigationService.goTo('/movie', id);
  }
}
