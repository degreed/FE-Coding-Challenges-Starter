import { Component, Input } from '@angular/core';
import { MovieComplete } from 'movie-data-lib';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {
  @Input() movie: Partial<MovieComplete>;
}
