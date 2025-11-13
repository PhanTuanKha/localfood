import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  imports: [NgClass, CommonModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail {
selectedSize: any = null;

sizes = [
  { label: 'Nhỏ', price: 40000 },
  { label: 'Vừa', price: 60000 },
  { label: 'Lớn', price: 70000 },
  { label: 'XL', price: 80000 },
];

selectSize(size: any) {
  this.selectedSize = size;
}
}
