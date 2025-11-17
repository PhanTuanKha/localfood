import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../data/users';

@Component({
  selector: 'app-forgot-pasword',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-pasword.html',
  styleUrls: ['./forgot-pasword.css'],
})
export class ForgotPasswordComponent {
  email = '';
  phone = '';
  newPassword = '';
  confirmPassword = '';
  error = '';
  success = '';

  constructor(private router: Router, private userService: UsersService) {}

  async onSubmit() {
    this.error = '';
    this.success = '';

    if (!this.email || !this.phone || !this.newPassword || !this.confirmPassword) {
      this.error = 'Vui lòng nhập đầy đủ thông tin.';
      return;
    }

    if (!/^[0-9]{9}$/.test(this.phone)) {
      this.error = 'Số điện thoại phải gồm 9 chữ số (không tính mã quốc gia).';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Mật khẩu xác nhận không trùng khớp.';
      return;
    }

    await this.userService.loadUsers();

    const fullPhone = '+84' + this.phone;
    const users = this.userService.getUsers();

    const user = users.find(u => u.email === this.email && u.phone === fullPhone);

    if (!user) {
      this.error = 'Không tìm thấy người dùng với email hoặc số điện thoại này.';
      return;
    }

    user.password = this.newPassword;
    this.success = 'Cập nhật mật khẩu thành công! Đang chuyển hướng...';

    setTimeout(() => {
      this.router.navigate(['/signin']);
    }, 1500);
  }
}
