import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-group-order',
  imports: [ CommonModule],
  templateUrl: './group-order.html',
  styleUrl: './group-order.css',
})
export class GroupOrder {
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
