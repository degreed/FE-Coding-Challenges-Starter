import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRowComponent } from './movie-row.component';
import { GoImdbModule } from '../navigation/go-imdb/go-imdb.module';
import { GoDetailsModule } from '../navigation/go-details/go-details.module';



@NgModule({
  declarations: [
    MovieRowComponent
  ],
  imports: [
    CommonModule,
    GoImdbModule,
    GoDetailsModule
  ],
  exports: [
    MovieRowComponent
  ]
})
export class MovieRowModule { }
