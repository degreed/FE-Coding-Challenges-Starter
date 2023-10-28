import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesComponent } from './components/movies/movies.component';
import { DecadesComponent } from './components/navigation/decades/decades.component';
import { GoBackComponent } from './components/navigation/go-back/go-back.component';
import { NavigationService } from './services/navigation.service';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { DataService } from './services/data.service';
import { CardComponent } from './components/shared/card/card.component';
import { DecadeFilterPipe } from './pipes/decadeFilter.pipe';
import { EllipsisDirective } from './directives/ellipsis.directive';
@NgModule({
  declarations: [
    MoviesComponent,
    MovieComponent,
    SidebarComponent,
    GoBackComponent,
    AppComponent,
    DecadesComponent,
    CardComponent,
    DecadeFilterPipe,
    EllipsisDirective
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [DataService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
