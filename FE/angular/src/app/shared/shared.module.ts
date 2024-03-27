import { NgModule } from '@angular/core';
import { GoBackComponent } from './components/go-back/go-back.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GoBackComponent, SidebarComponent],
  imports: [CommonModule],
  exports: [GoBackComponent, SidebarComponent]
})
export class SharedModule {}
