import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { DecadesModule } from '../navigation/decades/decades.module';
import { GoDetailsModule } from '../navigation/go-details/go-details.module';


@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    DecadesModule,
    GoDetailsModule,
    MoviesRoutingModule,
  ],
  exports: [
    MoviesComponent
  ]
})
export class MoviesModule { }
