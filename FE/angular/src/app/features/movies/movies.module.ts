import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieComponent } from './pages/movie/movie.component';
import { DataService } from './services/data/data.service';
import { CommonModule } from '@angular/common';
import { DecadesComponent } from '../../shared/components/decades/decades.component';
import { GoDetailsComponent } from '../../shared/components/go-details/go-details.component';
import { GoImdbComponent } from '../../shared/components/go-imdb/go-imdb.component';

@NgModule({
  declarations: [MoviesComponent, MovieComponent, DecadesComponent, GoDetailsComponent, GoImdbComponent],
  imports: [MoviesRoutingModule, SharedModule, HttpClientModule, CommonModule],
  providers: [DataService]
})
export class MoviesModule {}
