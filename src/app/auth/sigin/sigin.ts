import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sigin',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sigin.html',
  styleUrl: './sigin.css',
})
export class Signin {
  username: string = '';
  password: string = '';
  role: 'customer' | 'admin' | 'vendor' = 'customer';
  error: string = '';
  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Vui lòng điền đầy đủ thông tin';
      return;
    }
    console.log('Login attempt:', {
      username: this.username,
      password: this.password,
      role: this.role,
    });
    this.error = '';
    alert(`Đăng nhập thành công với ${this.role}`);
  }
}