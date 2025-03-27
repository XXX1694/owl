import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = { username: '', email: '' };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe((data) => (this.user = data));
  }

  updateProfile() {
    this.userService.updateProfile(this.user).subscribe({
      next: () => alert('Profile updated'),
      error: (err) => console.error('Update failed', err),
    });
  }
}
