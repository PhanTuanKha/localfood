import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [NgClass, CommonModule, RouterModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail {

  activeTab: string = 'personal';

  constructor(private router: Router) {}

  // ============================
  // MÓN 1
  // ============================
  sizes1 = [
    { label: 'Tô thường', price: 45000, quantity: 0 },
    { label: 'Đặc biệt', price: 55000, quantity: 0 },
  ];
  selectedSize1: any = null;

  // ============================
  // MÓN 2
  // ============================
  sizes2 = [
    { label: 'Tô thường', price: 45000, quantity: 0 },
    { label: 'Đặc biệt', price: 55000, quantity: 0 },
  ];
  selectedSize2: any = null;

  // ============================
  // MÓN 3
  // ============================
  sizes3 = [
    { label: 'Tô thường', price: 45000, quantity: 0 },
    { label: 'Đặc biệt', price: 55000, quantity: 0 },
  ];
  selectedSize3: any = null;

  // ============================
  // TAB
  // ============================
  goToPersonal() {
    this.activeTab = 'personal';
    this.router.navigate(['/order-detail']);
  }

  goToGroupOrder() {
    this.activeTab = 'group';
    this.router.navigate(['/group-order']);
  }

  // ============================
  // SELECT SIZE
  // ============================
  selectSize(foodIndex: number, size: any) {
    if (foodIndex === 1) this.selectedSize1 = size;
    if (foodIndex === 2) this.selectedSize2 = size;
    if (foodIndex === 3) this.selectedSize3 = size;
  }

  // ============================
  // ADD QUANTITY
  // ============================
  addQuantity(foodIndex: number) {
    if (foodIndex === 1 && this.selectedSize1) this.selectedSize1.quantity++;
    if (foodIndex === 2 && this.selectedSize2) this.selectedSize2.quantity++;
    if (foodIndex === 3 && this.selectedSize3) this.selectedSize3.quantity++;
  }

  // ============================
  // REMOVE QUANTITY
  // ============================
  removeQuantity(foodIndex: number) {
    let size;

    if (foodIndex === 1) size = this.selectedSize1;
    if (foodIndex === 2) size = this.selectedSize2;
    if (foodIndex === 3) size = this.selectedSize3;

    if (size && size.quantity > 0) {
      size.quantity--;

      if (size.quantity === 0) {
        if (foodIndex === 1) this.selectedSize1 = null;
        if (foodIndex === 2) this.selectedSize2 = null;
        if (foodIndex === 3) this.selectedSize3 = null;
      }
    }
  }

}
