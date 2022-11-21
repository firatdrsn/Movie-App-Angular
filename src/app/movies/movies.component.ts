import { AlertifyService } from '../shared/services/alertify.service';
import { Movie } from './models/movie';
import { Component, OnInit } from '@angular/core';
import { MovieService } from './services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService]
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  title: string = "Movies List";
  searchText: string = "";
  filteredMovies: Movie[] = [];
  error: any;
  loading: boolean = false;
  userId: string;
  movieList: string[] = [];

  constructor(
    private alertify: AlertifyService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.filteredMovies = this.movies;
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.userId = user.id
        this.movieService.getList(this.userId).subscribe(data => {
          this.movieList = data;
        })
      } else {
        this.userId = ""
      }
    })
    this.activatedRoute.params.subscribe(params => {
      this.loading = true;
      this.movieService.getMovies(params["categoryId"]).subscribe(movies => {
        this.movies = movies;
        this.filteredMovies = this.movies;
        this.loading = false;
      }, error => {
        this.error = error;
        this.loading = false;
      });
    })
  }

  onInputChange() {
    this.filteredMovies = this.movies.filter((movie: Movie) => {
      return movie.title.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase()) !== -1 || movie.description.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase()) !== -1;
    })
  }

  addToList($event: any, movie: Movie) {
    if ($event.target.classList.contains("btn-primary")) {
      $event.target.innerText = "Remove from list";
      $event.target.classList.remove("btn-primary");
      $event.target.classList.add("btn-danger");
      this.movieService.addToMyList({ userId: this.userId, movieId: movie.id })
        .subscribe(() => this.alertify.success(movie.title + " added to list"))
    } else {
      $event.target.innerText = "Add to List";
      $event.target.classList.remove("btn-danger");
      $event.target.classList.add("btn-primary");
      this.movieService.removeFromList({ userId: this.userId, movieId: movie.id })
        .subscribe(() => this.alertify.error(movie.title + " removed from list"))
    }
  }

  closeDialog() {
    this.error = null;
  }

  getButtonsState(movie: Movie) {
    return this.movieList.findIndex(m => m === movie.id) > -1
  }
}
