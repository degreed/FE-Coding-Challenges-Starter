import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage, provideImgixLoader } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { DataService } from '../services/data.service';
import { MoviesRouteGuard } from '../route-guards/movies.guard';
import { PComponentsModule } from '../p-components/p-components.module';
import { NavigationService } from '../services/navigation.service';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/store.state';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [MoviesComponent, MovieComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    NgOptimizedImage,
    PComponentsModule,
    LayoutModule,
    StoreModule.forFeature('movies', reducers)
  ],
  providers: [
    DataService,
    NavigationService,
    provideImgixLoader('https://m.media-amazon.com/images/M/'),
    MoviesRouteGuard
  ]
})
export class MoviesModule {}
