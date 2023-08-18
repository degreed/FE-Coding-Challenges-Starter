import { MovieComplete } from '../../services/data.service';

export interface MoviesInterFace {
  Search: MovieComplete[];
  Decades: number[];
  isHandset: boolean;
}
