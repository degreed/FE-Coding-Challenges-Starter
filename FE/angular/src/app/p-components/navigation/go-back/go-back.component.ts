import { Component, Input } from '@angular/core';
import { BaseLink } from '../../sidebar/sidebar.component';
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
  @Input() isHandset: boolean | null;

  constructor(private navigationService: NavigationService) {}

  public navigateTo() {
    this.navigationService.goTo('/');
  }
}
