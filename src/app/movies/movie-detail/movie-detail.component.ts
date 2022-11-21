import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  providers: [MovieService]
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  loading: boolean = false;

  constructor(
    private movieService: MovieService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.loading = true;
      this.movieService.getMovieById(params["movieId"]).subscribe(movie => {
        this.movie = movie;
        this.loading = false;
      })
    })
  }

}
