import { Component, OnInit } from '@angular/core';
import { NgAuthService } from '../ng-auth.service';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  constructor(public movieService: MovieService, public ngAuthService: NgAuthService) {}
  
  tiles: any = [];
  idToken: string;

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    return this.movieService.getMovies().subscribe((data: {}) => {
      this.tiles = data;
    });
  }
}
