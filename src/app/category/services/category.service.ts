import { Category } from '../models/category';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {
  url: string = "http://localhost:3000/categories";
  url_firebase: string = "https://angular-movie-app-e2a9a-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url_firebase + "categories.json").pipe(
      map((responseCategory: any) => {
        const categories: Category[] = [];
        for (const key in responseCategory) {
          categories.push({ ...responseCategory[key], id: key })
        }
        return categories;
      })
    );
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url_firebase + "categories.json", category);
  }
}
