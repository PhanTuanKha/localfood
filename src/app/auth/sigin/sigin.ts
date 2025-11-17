import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../data/users';

@Component({
  selector: 'app-sigin',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sigin.html',
  styleUrl: './sigin.css',
})
export class Signin implements OnInit {

  username: string = '';
  password: string = '';
  error: string = '';
  users: User[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<User[]>('assets/data/users.json').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: () => {
        this.error = 'Không thể tải dữ liệu người dùng.';
      }
    });
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Vui lòng điền đầy đủ thông tin';
      return;
    }

    const user = this.users.find(
      (u) => u.username === this.username && u.password === this.password
    );

    if (user) {
      this.error = '';

      sessionStorage.setItem(
        'currentUserSession',
        JSON.stringify({
          user,
          loginTime: new Date().toISOString(),
        })
      );

      this.authService.login();
      alert('Đăng nhập thành công!');
      if (this.username.endsWith('_vendor') || user.role === 'vendor') {
        this.router.navigate(['/vendor']);
      } else {
        this.router.navigate(['/']);
      }

    } else {
      this.error = 'Đăng nhập sai. Vui lòng đăng nhập lại hoặc chọn quên mật khẩu.';
    }
  }
}
