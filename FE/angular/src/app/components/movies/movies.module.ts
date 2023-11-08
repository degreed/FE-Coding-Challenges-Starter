import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { DecadesModule } from '../navigation/decades/decades.module';
import { MovieRowModule } from '../movie-row/movie-row.module';


@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    DecadesModule,
    MovieRowModule,
    MoviesRoutingModule,
  ],
  exports: [
    MoviesComponent
  ]
})
export class MoviesModule { }
