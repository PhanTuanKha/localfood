import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { checkLogin, User, users } from '../../data/users';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sigin',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sigin.html',
  styleUrl: './sigin.css',
})
export class Signin {
  username: string = '';
  password: string = '';
  role: 'customer' | 'admin' | 'vendor' = 'admin';
  error: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Vui lòng điền đầy đủ thông tin';
      return;
    }

    const user = users.find(
      (u) => u.username === this.username && u.password === this.password && u.role===this.role
    );

    if (user) {
      this.error = '';
      this.role = user.role;

      const sessionData = {
        user,
        loginTime: new Date().toISOString(),
      };
      sessionStorage.setItem('currentUserSession', JSON.stringify(sessionData));
      this.authService.login();
      alert(`Đăng nhập thành công với vai trò ${this.role}`);

      this.router.navigate(['/']);
    } else {
      this.error = 'Đăng nhập sai. Vui lòng đăng nhập lại hoặc chọn quên mật khẩu.';
    }
  }
}