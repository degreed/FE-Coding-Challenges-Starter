import { Component, Input } from '@angular/core';
import { MovieComplete } from '../movie/movie.models';

@Component({
  selector: 'movie-row',
  templateUrl: './movie-row.component.html'
})
export class MovieRowComponent {

  @Input() isMovies = false;

  @Input() movie: MovieComplete;

}
