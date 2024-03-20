import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { DecadesComponent } from './navigation/decades/decades.component';
import { GoBackComponent } from './navigation/go-back/go-back.component';
import { GoDetailsComponent } from './navigation/go-details/go-details.component';
import { GoImdbComponent } from './navigation/go-imdb/go-imdb.component';
import { NavigationService } from '../services/navigation.service';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MovieDataLibService } from 'movie-data-lib';

@NgModule({
  declarations: [
    MovieCardComponent,
    MovieListComponent,
    MovieDetailComponent,
    SidebarComponent,
    GoBackComponent,
    GoDetailsComponent,
    GoImdbComponent,
    DecadesComponent
  ],
  imports: [CommonModule, HttpClientModule, MoviesRoutingModule],
  providers: [MovieDataLibService, NavigationService]
})
export class MoviesModule {}
