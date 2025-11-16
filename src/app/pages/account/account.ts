import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  name: string;
  username: string;
  phone: string;
  email: string;
  avatar?: string;
}

interface OrderStats {
  total: number;
  delivered: number;
  processing: number;
}

@Component({
  selector: 'app-account',
  imports: [CommonModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
  user: User = {
    name: "Nguyễn Văn A",
    username: "user123",
    phone: "0123456789",
    email: "user@gmail.com",
    avatar: "assets/images/user.png"
  };

  orderStats: OrderStats = {
    total: 12,
    delivered: 8,
    processing: 4
  };

  constructor(private router: Router) {}

  goToOrderHistory() {
    this.router.navigate(['/order-history']);
  }

  goToSupport() {
    this.router.navigate(['/support']);
  }

  goToOrder() {
    this.router.navigate(['/']);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  onAvatarUpload(event: any): void {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.match('image.*')) {
      alert('Vui lòng chọn file ảnh!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh không được vượt quá 5MB!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.user.avatar = e.target.result;
      console.log('Avatar uploaded:', file.name);
      event.target.value = '';
    };

    reader.readAsDataURL(file);
  }
}
