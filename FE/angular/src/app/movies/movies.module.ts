import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesModuleComponent } from './movies.component';


@NgModule({
  declarations: [
    MoviesModuleComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
