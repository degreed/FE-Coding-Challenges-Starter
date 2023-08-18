import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from '../services/data.service';
@Injectable({
  providedIn: 'root'
})
export class MoviesRouteGuard implements CanActivate {
  constructor(private dataService: DataService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // purpose of this authguard is to handle errors that might happen in movie.component,
    // checks if API response is stored locally, if not navigates back to movies.component
    const hasMovies = this.dataService.hasMovies();
    if (hasMovies) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
