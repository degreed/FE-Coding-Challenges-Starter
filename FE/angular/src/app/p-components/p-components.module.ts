import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DecadesComponent } from './navigation/decades/decades.component';
import { GoBackComponent } from './navigation/go-back/go-back.component';
import { GoDetailsComponent } from './navigation/go-details/go-details.component';
import { GoImdbComponent } from './navigation/go-imdb/go-imdb.component';

@NgModule({
  declarations: [SidebarComponent, DecadesComponent, GoBackComponent, GoDetailsComponent, GoImdbComponent],
  imports: [CommonModule],
  exports: [SidebarComponent, DecadesComponent, GoBackComponent, GoDetailsComponent, GoImdbComponent]
})
export class PComponentsModule {}
