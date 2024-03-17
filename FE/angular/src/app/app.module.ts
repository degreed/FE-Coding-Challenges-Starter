import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecadesComponent } from './components/navigation/decades/decades.component';
import { GoBackComponent } from './components/navigation/go-back/go-back.component';
import { GoDetailsComponent } from './components/navigation/go-details/go-details.component';
import { GoImdbComponent } from './components/navigation/go-imdb/go-imdb.component';
import { NavigationService } from './components/navigation/navigation.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
