import { ActivatedRoute } from '@angular/router';
import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { DataService } from '../../services/data.service';
import { MovieComponent } from './movie.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync } from '@angular/core/testing';

const mockDataService = mockProvider(DataService, {
  getMovie(id: string) {
    return of({});
  }
});

const activatedRouteStub = {
  paramMap: {
    get(id: string) {
      return 234;
    }
  }
};

describe('MovieComponent', () => {
  let spectator: Spectator<MovieComponent>;
  let component: MovieComponent;
  const createComponent = createComponentFactory({
    component: MovieComponent,
    imports: [HttpClientTestingModule],
    declarations: [],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: activatedRouteStub
        }
      },
      {
        provide: DataService,
        useValue: mockDataService
      }
    ],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test("should create the component", fakeAsync(()=>{
    expect(component).toBeTruthy();
  }))
});
