import { CommonModule } from '@angular/common';
import { Component,Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-sidebar.html',
  styleUrl: './cart-sidebar.css',
})
export class CartSidebar implements OnInit {

    @Input() isOpen: boolean = false;
    @Output() close = new EventEmitter<void>();

    deliveryTime: string = ''; // Thời gian giao hàng
    selectedDiscount: number = 0;

    cartItems = [
        { name: '12” Vegetarian Pizza', price: 27.90, qty: 1, desc: 'Không nấm + ớt chuông xanh' },
        { name: '12” Vegetarian Pizza', price: 27.90, qty: 1, desc: 'Không nấm + ớt chuông xanh' },
        { name: '12” Vegetarian Pizza', price: 27.90, qty: 1, desc: 'Không nấm + ớt chuông xanh' },
        { name: '12” Vegetarian Pizza', price: 27.90, qty: 1, desc: 'Không nấm + ớt chuông xanh' }
    ];

    ngOnInit(): void {
        this.updateDeliveryTime();
    }

    increase(item: any) { item.qty++; }
    decrease(item: any) { if (item.qty > 1) item.qty--; }

    updateDeliveryTime() {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);

        this.deliveryTime =
            'Dự kiến: ' +
            now.getHours().toString().padStart(2, '0') +
            ':' +
            now.getMinutes().toString().padStart(2, '0');
    }

    get total() {
        return this.cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    }
    
    get calculatedDiscount() {
        return 3.00 + (this.total * this.selectedDiscount);
    }
    
    get finalTotal() {
        const shippingFee = 2.50;
        const serviceFee = 2.50;
        return this.total + shippingFee + serviceFee - this.calculatedDiscount;
    }
}