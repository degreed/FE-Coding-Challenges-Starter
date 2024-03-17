import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from '../../components/movies/movies.component';
import { MovieComponent } from '../../components/movie/movie.component';
import { DecadesComponent } from 'src/app/components/navigation/decades/decades.component';
import { GoImdbComponent } from 'src/app/components/navigation/go-imdb/go-imdb.component';
import { GoBackComponent } from 'src/app/components/navigation/go-back/go-back.component';
import { GoDetailsComponent } from 'src/app/components/navigation/go-details/go-details.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/components/navigation/navigation.service';
import { MoviesRoutingModule } from './movies-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MoviesComponent,
    MovieComponent,
    DecadesComponent,
    GoImdbComponent,
    GoBackComponent,
    GoDetailsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HttpClientModule
  ],
  providers: [DataService, NavigationService]
})
export class MoviesModule { }
