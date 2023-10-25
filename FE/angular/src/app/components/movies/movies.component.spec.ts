import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesComponent } from './movies.component';
import { FilterByDecadePipe } from '../../pipes/filterByDecade.pipe';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';
import { mockDecades, mockMovies } from '../../mockData';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesComponent, FilterByDecadePipe],
      providers: [DataService],
      imports: [HttpClientTestingModule],
    }).compileComponents(); // Compile components asynchronously

    // Create a mock DataService that returns mock data
    TestBed.overrideProvider(DataService, { useValue: { getMovies: () => of({ Decades: mockDecades, Search: mockMovies }) } });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
