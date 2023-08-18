import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { movieResolver } from '../resolvers/movies.resolver';
import { MovieComponent } from './movie/movie.component';
import { MoviesRouteGuard } from '../route-guards/movies.guard';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    resolve: { moviesData: movieResolver }
  },
  {
    path: ':id',
    component: MovieComponent,
    canActivate: [MoviesRouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
