import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../app/auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
