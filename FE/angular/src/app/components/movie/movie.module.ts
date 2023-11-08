import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { GoBackModule } from '../navigation/go-back/go-back.module';
import { MovieRowModule } from '../movie-row/movie-row.module';


@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    GoBackModule,
    MovieRowModule,
    MovieRoutingModule,
  ],
  exports: [
    MovieComponent
  ]
})
export class MovieModule { }
