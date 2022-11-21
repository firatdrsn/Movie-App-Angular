import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService]
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup;
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
  }
  get name() {
    return this.categoryForm.get("name");
  }

  createCategory() {
    const category: Category = {
      name: this.name.value,
    };
    this.categoryService.addCategory(category).subscribe(data => {
      this.router.navigate(["/"]);
    });
  }

}
