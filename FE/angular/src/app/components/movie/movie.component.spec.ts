import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { DataService } from '../../services/data.service';
import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let spectator: Spectator<MovieComponent>;
  let component: MovieComponent;
  const createComponent = createComponentFactory({
    component: MovieComponent,
    imports: [],
    declarations: [],
    providers: [
      mockProvider(DataService), // provide mockDataService as mockProvider
      {
        provide: ActivatedRoute,
        useValue: {
          params: of(convertToParamMap({ id: '123' })) // provide an observable with params
        }
      }
    ],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
