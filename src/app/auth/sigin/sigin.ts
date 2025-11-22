import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsersService, User } from '../../data/users';

@Component({
  selector: 'app-sigin',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sigin.html',
  styleUrl: './sigin.css',
})
export class Signin {

  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Vui lòng điền đầy đủ thông tin';
      return;
    }

    // DÙNG CHUNG LOGIC VỚI MAINPAGE
    const user: User | null = this.userService.checkLogin(
      this.username,
      this.password
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

      if (user.role === 'vendor') {
        this.router.navigate(['/vendor']);
      } else {
        this.router.navigate(['/']);
      }

    } else {
      this.error = 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.';
    }
  }
}
