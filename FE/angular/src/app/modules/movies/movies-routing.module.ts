import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from 'src/app/components/movie/movie.component';
import { MoviesComponent } from 'src/app/components/movies/movies.component';


const routes: Routes = [
  {
    path: '',
    component: MoviesComponent
  },
  {
    path: 'movie/:id',
    component: MovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }