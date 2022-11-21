import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loading: boolean = false;
  isHaveAccount: boolean = false;
  error: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm, event: any): void {
    const email = form.value.email;
    const password = form.value.password;
    let authResponse: Observable<any>;
    if (form.invalid) {
      return;
    }
    this.loading = true;
    if (this.isHaveAccount) {
      authResponse = this.authService.signUp(email, password)
    } else {
      authResponse = this.authService.signIn(email, password)
    }
    authResponse.subscribe({
      next: (response) => {
        this.loading = false;
        if (response?.registered) {
          this.router.navigate(["/movies"]);
        }
        form.reset();
      }, error: (err) => {
        this.loading = false;
        this.error = err;
      }
    })
  }

  toggleButtonType() {
    this.isHaveAccount = !this.isHaveAccount;
  }
  closeDialog() {
    this.error = null;
  }
}
