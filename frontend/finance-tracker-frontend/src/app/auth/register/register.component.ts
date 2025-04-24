import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  password2 = '';
  error: string | null = null;

  constructor(private authService: AuthService) {}

  onRegister() {
    if (this.password !== this.password2) {
      this.error = 'Пароли не совпадают';
      return;
    }

    this.authService
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
        password2: this.password2,
      })
      .subscribe({
        next: () => {},
        error: (err) => {
          this.error = 'Ошибка регистрации';
          console.error(err);
        },
      });
  }
}
