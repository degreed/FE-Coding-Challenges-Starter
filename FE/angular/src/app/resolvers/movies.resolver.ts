import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService } from '../services/data.service';

export const movieResolver: ResolveFn<any> = (route, state) => {
  const dashboardService = inject(DataService)
  return dashboardService.getMovies()
};