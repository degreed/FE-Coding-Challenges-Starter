import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls:['./movies.component.scss']
})
export class MoviesComponent implements OnDestroy, OnInit {
  public currDecade: number | undefined;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public movies: MovieComplete[] = [];
  private moviesSubscription: any;
  @Input() moviesData:{Decades:number[], Search:MovieComplete[]};

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    // this.moviesSubscription = this.dataService.getMovies().pipe(
    //   tap((data)=>{
    //     console.log(data)
    //   }),
    //   shareReplay()
    // ).subscribe({
    //   next: data => {
       
    //   }
    // });
    this.decades = this.moviesData.Decades;
    this.movies = this.moviesData.Search;
    this.displayMovies();
  }

  public ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
  }

  public displayMovies(decade?: number): void {
    if (!this.movies?.length) {
      this.filteredMovies = [];
      return;
    }

    this.currDecade = decade;
    this.filteredMovies = this.dataService.getFilteredMovies(this.movies, decade);
  }
}
