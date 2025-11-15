import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-order',
  imports: [ CommonModule],
  templateUrl: './group-order.html',
  styleUrl: './group-order.css',
})
export class GroupOrder {
selectedSize: any = null;

constructor(private router: Router) {}

sizes = [
  { label: 'Nhỏ', price: 40000 },
  { label: 'Vừa', price: 60000 },
  { label: 'Lớn', price: 70000 },
  { label: 'XL', price: 80000 },
];

selectSize(size: any) {
  this.selectedSize = size;
}
goToDetail() {
  this.router.navigate(['/group-order-detail']);
}
}
