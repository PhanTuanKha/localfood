import { Component } from '@angular/core';
import { NgClass, CurrencyPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  imports: [CommonModule, NgClass, FormsModule, CurrencyPipe],
  templateUrl: './vendor.html',
  styleUrls: ['./vendor.css'],
})
export class Vendor {
  openAddForm = false;
  showFeedback = false;

  sizes = [
    { label: 'Nhỏ', price: 40000 },
    { label: 'Vừa', price: 60000 },
    { label: 'Lớn', price: 70000 },
    { label: 'XL', price: 80000 },
  ];

  selectedSize: any = null;

  foodList = [
    {
      img: 'assets/images/logo/pizza1.png',
      name: 'Farm House Xtreme Pizza',
      price: 120000,
      quantity: 10,
      status: 'available'
    },
    {
      img: 'assets/images/logo/pizza2.png',
      name: 'Farm House Xtreme Pizza',
      price: 90000,
      quantity: 5,
      status: 'out'
    }
  ];

  constructor(private router: Router) {}

  selectSize(size: any) {
    this.selectedSize = size;
  }

  toggleFeedback() { 
    this.showFeedback = !this.showFeedback; 
  }

  goToMyReply() {
    this.router.navigate(['/my-reply']);
  }
}
