import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(
      './components/movies/movies.module'
    ).then((x) => x.MoviesModule)
  },
  {
    path: 'movie',
    loadChildren: () => import(
      './components/movie/movie.module'
    ).then((x) => x.MovieModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
