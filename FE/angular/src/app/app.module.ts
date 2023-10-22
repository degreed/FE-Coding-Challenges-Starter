import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './movies/components/movie/movie.component';
import { MoviesComponent } from './movies/components/movies/movies.component';
import { DecadesComponent } from './movies/components/navigation/decades/decades.component';
import { GoBackComponent } from './movies/components/navigation/go-back/go-back.component';
import { GoDetailsComponent } from './movies/components/navigation/go-details/go-details.component';
import { GoImdbComponent } from './movies/components/navigation/go-imdb/go-imdb.component';
import { NavigationService } from './movies/components/navigation/navigation.service';
import { SidebarComponent } from './movies/components/sidebar/sidebar.component';
import { DataService } from './movies/services/data.service';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieComponent,
    SidebarComponent,
    GoBackComponent,
    GoDetailsComponent,
    GoImdbComponent,
    AppComponent,
    DecadesComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [DataService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
