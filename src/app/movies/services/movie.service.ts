import { Movie } from '../models/movie';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { MyList } from '../models/mylist';

@Injectable()
export class MovieService {
    url: string = "http://localhost:3000/movies";
    url_firebase: string = "https://angular-movie-app-e2a9a-default-rtdb.europe-west1.firebasedatabase.app/";

    constructor(private http: HttpClient) {
    }

    getMovies(categoryId?: number): Observable<Movie[]> {
        let newUrl = this.url_firebase + "movies.json";
        return this.http.get<Movie[]>(newUrl).pipe(
            map(responseMovies => {
                const movies: Movie[] = [];
                for (const key in responseMovies) {
                    if (categoryId) {
                        if (responseMovies[key].category == categoryId) {
                            movies.push({ ...responseMovies[key], id: key })
                        }
                    } else {
                        movies.push({
                            ...responseMovies[key],
                            id: key
                        })
                    }
                }
                return movies;
            }),
            catchError(err => this.handleError(err))
        );
    }

    getMovieById(movieId: string): Observable<Movie> {
        let newUrl = this.url_firebase + "movies/" + movieId + ".json";
        return this.http.get<Movie>(newUrl).pipe(
            catchError(err => this.handleError(err))
        );
    }

    addMovie(movie: Movie): Observable<Movie> {
        return this.http.post<Movie>(this.url_firebase + "movies.json", movie).pipe(
            catchError(err => this.handleError(err))
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            //client or network error
            console.log("client or network error");
        } else {
            //server error
            switch (error.status) {
                case 404:
                    console.log("404 not found");
                    break;
                case 403:
                    console.log("403 forbidden");
                    break;
                case 500:
                    console.log("500 server error");
                    break;
                default:
                    console.log("unknown error");
            }
        }
        return throwError("Error! something went wrong");
    }

    addToMyList(item: MyList): Observable<MyList> {
        return this.http.post<MyList>(`${this.url_firebase}/users/${item.userId}/list/${item.movieId}.json`, {
            dateAdded: new Date().getTime()
        }).pipe(
            catchError(this.handleError)
        )
    }

    removeFromList(item: MyList): Observable<MyList> {
        return this.http.delete<MyList>(`${this.url_firebase}/users/${item.userId}/list/${item.movieId}.json`).pipe(
            catchError(this.handleError)
        );
    }

    getList(userId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.url_firebase}/users/${userId}/list.json`)
            .pipe(
                map(response => {
                    const movies: string[] = [];
                    for (const key in response) {
                        movies.push(key)
                    }
                    return movies;
                }),
                catchError(this.handleError)
            )
    }
}