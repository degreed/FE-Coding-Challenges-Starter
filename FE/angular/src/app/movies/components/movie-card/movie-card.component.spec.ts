import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let spectator: Spectator<MovieCardComponent>;
  let component: MovieCardComponent;
  const createComponent = createComponentFactory({
    component: MovieCardComponent,
    imports: [],
    declarations: [],
    providers: [],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
