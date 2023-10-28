import { Component } from '@angular/core';
import { BaseLink } from '../../shared/sidebar/sidebar.component';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html'
})
export class GoBackComponent {
  public links: BaseLink[] = [
    {
      label: 'Go Back',
      isActive: true
    }
  ];

  constructor(private navigationService: NavigationService) {}

  public navigateTo() {
    this.navigationService.goTo('/');
  }
}
