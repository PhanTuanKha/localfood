import { Component } from '@angular/core';
import { CommonModule, NgClass, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule, CurrencyPipe],
  templateUrl: './vendor.html',
  styleUrls: ['./vendor.css'],
})
export class Vendor {

  openAddForm = false;

  editIndex: number | null = null;
  editFood: any = {};

  sizes = [
    { label: 'Nhỏ', price: 40000 },
    { label: 'Vừa', price: 60000 },
    { label: 'Lớn', price: 70000 },
    { label: 'XL', price: 80000 },
  ];

  newFood: any = {
    name: '',
    price: 0,
    quantity: 0,
    status: 'available',
    size: 'Nhỏ'
  };

  foodList = [
    {
      img: 'assets/images/logo/pizza1.png',
      name: 'Farm House Xtreme Pizza',
      price: 120000,
      quantity: 10,
      status: 'available',
      size: 'Lớn'
    },
    {
      img: 'assets/images/logo/pizza2.png',
      name: 'Farm House Pizza',
      price: 90000,
      quantity: 0,
      status: 'out',
      size: 'Nhỏ'
    }
  ];

  constructor(private router: Router) {}

  updateQuantityByStatus() {
    if (this.newFood.status === 'out') {
      this.newFood.quantity = 0;
    }
  }

  addFood() {
    if (this.newFood.price < 10000) return;

    this.foodList.push({
      img: 'assets/images/logo/pizza1.png',
      ...this.newFood
    });

    this.newFood = {
      name: '',
      price: 0,
      quantity: 0,
      status: 'available',
      size: 'Nhỏ'
    };

    this.openAddForm = false;
  }

  autoUpdateStatus(item: any) {
    if (item.status === 'out') item.quantity = 0;
  }

  autoFixQuantity(item: any) {
    if (item.quantity > 0) item.status = 'available';
    else item.status = 'out';
  }

  goToMyReply() {
    this.router.navigate(['/my-reply']);
  }

  editItem(index: number) {
    this.editIndex = index;
    this.editFood = { ...this.foodList[index] };
  }

  saveEdit(index: number) {
    this.foodList[index] = { ...this.editFood };
    this.editIndex = null;
  }

  cancelEdit() {
    this.editIndex = null;
  }

  deleteItem(index: number) {
    if (confirm("Bạn có chắc chắn muốn xóa món này?")) {
      this.foodList.splice(index, 1);
    }
  }
}
