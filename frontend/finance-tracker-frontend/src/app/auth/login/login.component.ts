import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {},
        error: (err) => {
          this.error = 'Неверный логин или пароль';
          console.error(err);
        },
      });
  }
}
