import { ImageValidator } from '../../validators/image.validator';
import { AlertifyService } from '../../shared/services/alertify.service';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { CategoryService } from '../../category/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../category/models/category';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, MovieService]
})
export class MovieCreateComponent implements OnInit {
  categories: Category[];
  model: any = {
    categoryId: ''
  };
  movieForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);

    this.movieForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required, ImageValidator.isValidExtentison]),
      categoryId: new FormControl('', [Validators.required]),
    })
  }

  get title() {
    return this.movieForm.get('title');
  }

  get imageUrl() {
    return this.movieForm.get('imageUrl');
  }

  get description() {
    return this.movieForm.get('description');
  }

  addMovie() {
    const movie = {
      title: this.movieForm.value.title,
      description: this.movieForm.value.description,
      image: this.movieForm.value.imageUrl,
      category: this.movieForm.value.categoryId,
      isPopular: false,
      datePublished: new Date().getTime()
    }
    if (this.movieForm.valid) {
      this.movieService.addMovie(movie).subscribe((movie) => {
        this.alertify.success(this.title.value + " added successfully");
        this.router.navigate(["/movies/"]);
      });
    } else {
      this.alertify.error("Please fill all fields");
    }
  }

  clearForm(e: any) {
    e.preventDefault();
    this.movieForm.setValue({
      title: '',
      description: '',
      imageUrl: '',
      categoryId: ''
    });
  }
}
