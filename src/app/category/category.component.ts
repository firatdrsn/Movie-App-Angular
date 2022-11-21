import { CategoryService } from './services/category.service';
import { Category } from './models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category = null;
  displayAll: boolean = true;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, error => console.log(error))
  }

  selectCategory(category?: Category) {
    if (category) {
      this.selectedCategory = category;
      this.displayAll = false;
    }
    else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }

}
