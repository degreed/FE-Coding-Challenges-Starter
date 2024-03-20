import { ActivatedRoute } from '@angular/router';
import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { DataService } from '../../services/data.service';
import { MovieDetailComponent } from './movie-detail.component';
import { of } from 'rxjs';

const mockMovieId = 'tt0103776';
const mockMovie = {
  "Title": "Batman Returns",
  "Year": "1992",
  "Rated": "PG-13",
  "Released": "19 Jun 1992",
  "Runtime": "126 min",
  "Genre": "Action, Crime, Fantasy",
  "Director": "Tim Burton",
  "Writer": "Bob Kane, Daniel Waters, Sam Hamm",
  "Actors": "Michael Keaton, Danny DeVito, Michelle Pfeiffer",
  "Plot": "While Batman deals with a deformed man calling himself the Penguin wreaking havoc across Gotham with the help of a cruel businessman, a female employee of the latter becomes the Catwoman with her own vendetta.",
  "Language": "English",
  "Country": "United States, United Kingdom",
  "Awards": "Nominated for 2 Oscars. 2 wins & 29 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "7.1/10"
    },
    {
      "Source": "Rotten Tomatoes",
      "Value": "82%"
    },
    {
      "Source": "Metacritic",
      "Value": "68/100"
    }
  ],
  "Metascore": "68",
  "imdbRating": "7.1",
  "imdbVotes": "324,645",
  "imdbID": "tt0103776",
  "Type": "movie",
  "DVD": "31 Jan 2013",
  "BoxOffice": "$162,924,631",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}

const mockActivatedRoute = mockProvider(ActivatedRoute, {
  params: of({ id: mockMovieId })
});
const mockDataService = mockProvider(DataService, {
  getMovie: jest.fn().mockReturnValue(of(mockMovie))
});

describe('MovieDetailComponent', () => {
  let spectator: Spectator<MovieDetailComponent>;
  let component: MovieDetailComponent;
  const createComponent = createComponentFactory({
    component: MovieDetailComponent,
    imports: [],
    declarations: [],
    providers: [mockActivatedRoute, mockDataService],
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

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    test('should set movie id', () => {
      expect(component.movieId).toEqual(mockMovieId);
    });
    test('should set movie', () => {
      expect(component.movie).toEqual(mockMovie);
    });
  });
});
