import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { CardComponent } from './card.component';
describe('CardComponent', () => {
  let spectator: Spectator<CardComponent>;
  let component: CardComponent;
  const createComponent = createComponentFactory({
    component: CardComponent,
    imports: [],
    declarations: [],
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

  test('should display movie title', () => {
    const title = 'Sample Movie';
    component.movie = {
      Title: title,
      Rated: '',
      Runtime: '',
      Released: '',
      Plot: '',
      Poster: '',
      imdbID: '',
      Actors: '',
      Director: '',
      Genre: '',
      Writer: '',
      Year: 2023,
      Type: ''
    };
    spectator.detectChanges();
    const titleElement = spectator.query('.title');
    expect(titleElement).toHaveText(title);
  });
});
