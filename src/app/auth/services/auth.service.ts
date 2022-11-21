import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import LoginResponse from "../models/login-reponse";
import RegisterResponse from "../models/register-response";
import User from "../models/user";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    apiKey = environment.firebaseApiKey;
    signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`
    signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {
    }

    signUp(email: string, password: string) {
        return this.http.post<RegisterResponse>(this.signUpUrl, {
            email: email, password: password, returnSecureToken: true
        }).pipe(tap(response => this.handleAuthentication(response)))
    }

    signIn(email: string, password: string) {
        return this.http.post<LoginResponse>(this.signInUrl, {
            email: email, password: password, returnSecureToken: true
        }).pipe(tap(response => this.handleAuthentication(response)))
    }

    handleAuthentication(response: any) {
        const expirationDate = new Date(new Date().getTime() + (+response.expiresIn * 1000))
        const user = new User(
            response.email,
            response.localId,
            response.idToken,
            expirationDate
        )
        this.user.next(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem("user");
        this.router.navigate(["/"])
    }

    autoLogin() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;
        const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser)
        }
    }
}