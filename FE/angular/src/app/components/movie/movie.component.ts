import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy, OnInit {
  public movie: MovieComplete;
  public movieId = '';

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit() {
    console.log('MoviesComponent initialized');
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.movieId = params.id;
        this.dataService.getMovie(this.movieId).subscribe((data) => {
          this.movie = data;
          console.log(data); // Log the data
        });
      }
    });
  }
  public generateAltText(movie: MovieComplete): string {
    return `Movie Poster: ${movie.Title}`; 
  }
  
  public ngOnDestroy(): void {
    // No need to unsubscribe because the component will be destroyed automatically.
  }
}
