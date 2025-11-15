import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-order-detail',
  imports: [CommonModule],
  templateUrl: './group-order-detail.html',
  styleUrl: './group-order-detail.css',
})
export class GroupOrderDetail implements OnInit {
  
  deliveryTime: string = '';

  ngOnInit(): void {
    this.updateDeliveryTime();
  }

  updateDeliveryTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);

    this.deliveryTime =
      'Dự kiến: ' +
      now.getHours().toString().padStart(2, '0') +
      ':' +
      now.getMinutes().toString().padStart(2, '0');
  }
}