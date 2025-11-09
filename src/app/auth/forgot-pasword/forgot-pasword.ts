import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { users, User } from '../../data/users';
users
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-pasword',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-pasword.html',
  styleUrl: './forgot-pasword.css',
})
export class ForgotPasswordComponent {
  email = '';
  phone = '';
  newPassword = '';
  confirmPassword = '';
  error = '';
  success = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.error = '';
    this.success = '';

    if (!this.email || !this.phone || !this.newPassword || !this.confirmPassword) {
      this.error = 'Vui lòng nhập đầy đủ thông tin.';
      return;
    }

    if (!this.phone.match(/^[0-9]{9}$/)) {
      this.error = 'Số điện thoại phải gồm 9 chữ số.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Mật khẩu xác nhận không trùng khớp.';
      return;
    }

    const fullPhone = '+84' + this.phone;
    const user = users.find(
      u => (u as any).email === this.email && (u as any).phone === fullPhone
    );

    if (!user) {
      this.error = 'Không tìm thấy người dùng với email hoặc số điện thoại này.';
      return;
    }

    user.password = this.newPassword;
    this.success = 'Cập nhật mật khẩu thành công!';

    setTimeout(() => {
      this.router.navigate(['/signin']);
    }, 1500);
  }
}