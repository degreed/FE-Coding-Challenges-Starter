import { mockProvider } from '@ngneat/spectator';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NavigationService } from '../../../services/navigation.service';
import { GoDetailsComponent } from './go-details.component';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

const mockGoTo = jest.fn();
const mockNavigationService = mockProvider(NavigationService, {
  goTo: mockGoTo
});

describe('GoDetailsComponent', () => {
  let spectator: Spectator<GoDetailsComponent>;
  let component: GoDetailsComponent;
  let router: Router;
  const createComponent = createComponentFactory({
    component: GoDetailsComponent,
    imports: [],
    declarations: [],
    providers: [mockNavigationService],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    router = TestBed.get(Router) as Router;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('navigateTo', () => {
    beforeEach(() => {
      const navigateSpy = jest.spyOn(router, 'navigate');
      component.navigateTo('tt1234');
      expect(navigateSpy).toBeCalledWith('/movie', 'tt1234');
    });
    // test('should call navigateService.goTo', () => {
    //   expect(mockGoTo).toBeCalledWith('/movie', 'tt1234');
    // });
  });
});
