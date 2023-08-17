import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesComponent } from './components/movies/movies.component';
import { movieResolver } from './resolvers/movies.resolver';

const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent,
    resolve: {moviesData:movieResolver}
  },
  {
    path: 'movie/:id',
    component: MovieComponent
  },
  {
    path:'',
    redirectTo: 'movies',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule {}

