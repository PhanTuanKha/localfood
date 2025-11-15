import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  imports: [NgClass, CommonModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail {
selectedSize: any = null;
activeTab: string = 'personal';

sizes = [
  { label: 'Nhỏ', price: 40000 },
  { label: 'Vừa', price: 60000 },
  { label: 'Lớn', price: 70000 },
  { label: 'XL', price: 80000 },
];
constructor(private router: Router) {}

// Tab
goToPersonal() {
  this.activeTab = 'personal';
  this.router.navigate(['/order-detail']);
}

goToGroupOrder() {
  this.activeTab = 'group';
  this.router.navigate(['/group-order']);
}

// Chọn size
selectSize(size: any) {
  this.selectedSize = size;
}
}
