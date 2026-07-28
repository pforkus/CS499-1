import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication'

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: Authentication, private router: Router) { }

  onSubmit() {
    this.errorMessage = '';
    
    this.auth.login(this.username, this.password, () => {
      this.router.navigate(['/']);
    }, (msg) => {
      this.errorMessage = msg;
    });
  }
}
