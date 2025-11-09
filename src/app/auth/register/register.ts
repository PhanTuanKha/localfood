import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { users, User, addUser } from '../../data/users';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  username = '';
  phone = '';
  countryCode = '+84'; 
  email = '';
  password = '';
  confirmPassword = '';
  role: 'customer' | 'vendor' = 'customer';

  address = '';
  description = '';
  imageBase64: string | null = null;
  imagePreview: string | null = null;

  error = '';

  constructor(private router: Router) {}

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
      this.imagePreview = this.imageBase64;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {

    if (!this.username || !this.phone || !this.email || !this.password) {
    this.error = 'Vui lòng nhập đầy đủ thông tin.';
    return;
  }

    if (this.password !== this.confirmPassword) {
      this.error = 'Mật khẩu không trùng khớp.';
      return;
    }

    if (users.find(u => u.username === this.username)) {
      this.error = 'Tên đăng ký đã tồn tại.';
      return;
    }

    if (users.find(u => (u as any).email === this.email)) {
      this.error = 'Email đã được sử dụng.';
      return;
    }

    if (!this.phone.match(/^[0-9]{9}$/)) {
    this.error = 'Số điện thoại phải gồm 9 chữ số.';
    return;
    }
    const fullPhone = '+84' + this.phone;
    if (users.find(u => (u as any).phone === fullPhone)) 
      {this.error = 'Số điện thoại đã được sử dụng.';
    return;
    }
    const newUser: any = {
      username: this.username,
      password: this.password,
      role: this.role,
      phone: this.phone,
      email: this.email
    };

    if (this.role === 'vendor') {
      newUser.address = this.address;
      newUser.description = this.description;
      newUser.image = this.imageBase64;
    }
    addUser(newUser as User);
    alert('Đăng ký thành công!');
    this.router.navigate(['/sigin']);
  }
}