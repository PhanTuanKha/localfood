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
    { label: 'Nhỏ', price: 40000, quantity: 0 },
    { label: 'Vừa', price: 60000, quantity: 0 },
    { label: 'Lớn', price: 70000, quantity: 0 },
    { label: 'XL', price: 80000, quantity: 0 },
  ];

  selectSize(size: any) {
    this.selectedSize = size;
  }

  addQuantity(size: any) {
    size.quantity++;
    this.selectedSize = size;
  }

  removeQuantity(size: any) {
    if (size.quantity > 0) {
      size.quantity--;
      if (size.quantity === 0 && this.selectedSize === size) {
        this.selectedSize = null;
      }
    }
  }
}
