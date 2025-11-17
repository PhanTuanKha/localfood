import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User, UsersService } from '../../data/users';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {

  username = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';
  role: 'customer' | 'vendor' = 'customer';

  address = '';
  description = '';
  imageBase64: string | null = null;
  imagePreview: string | null = null;

  error = '';

  constructor(private router: Router, private userService: UsersService) {}

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

  private async generateVendorUsername(baseName: string): Promise<string> {
    await this.userService.loadUsers();
    const nextNumber = this.userService.getNextVendorNumber();
    return `${baseName}./vendor_${nextNumber}`;
  }

  async onSubmit() {
    this.error = '';

    if (!this.username.trim() || !this.phone || !this.email || !this.password) {
      this.error = 'Vui lòng nhập đầy đủ thông tin.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Mật khẩu không trùng khớp.';
      return;
    }

    await this.userService.loadUsers();
    const users = this.userService.getUsers();

    if (this.role === "customer" && users.find(u => u.username === this.username.trim())) {
      this.error = 'Tên đăng ký đã tồn tại.';
      return;
    }

    if (users.find(u => u.email === this.email)) {
      this.error = 'Email đã được sử dụng.';
      return;
    }

    if (!/^[0-9]{9}$/.test(this.phone)) {
      this.error = 'Số điện thoại phải gồm 9 chữ số.';
      return;
    }

    const fullPhone = "+84" + this.phone;
    if (users.find(u => u.phone === fullPhone)) {
      this.error = 'Số điện thoại đã được sử dụng.';
      return;
    }

    let finalUsername = this.username.trim();
    if (this.role === "vendor") {
      finalUsername = await this.generateVendorUsername(finalUsername);
    }

    const newUser: User = {
      username: finalUsername,
      password: this.password,
      role: this.role,
      phone: fullPhone,
      email: this.email,
    };

    if (this.role === "vendor") {
      newUser.address = this.address;
      newUser.description = this.description;
      if (this.imageBase64) newUser.image = this.imageBase64;
    }

    this.userService.addUser(newUser);

    if (this.role === "vendor") {
      alert(`Đăng ký thành công! Username của bạn là: ${finalUsername}`);
    } else {
      alert('Đăng ký thành công!');
    }

    this.router.navigate(['/signin'])
  }
}
