import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-sidebar.html',
  styleUrl: './cart-sidebar.css',
})
export class CartSidebar implements OnInit {

    @Input() isOpen: boolean = false;
    @Output() close = new EventEmitter<void>();

    constructor(private router: Router) {}

    deliveryTime: string = '';
    selectedDiscount: number = 0;

    paymentMethod: string = "Tiền mặt";

    cartItems = [
        { name: 'Phở tái', price: 45000, qty: 1, desc: 'Không nấm + ớt chuông xanh' },
        { name: 'Phở gầu', price: 45000, qty: 1, desc: 'Không nấm + ớt chuông xanh' },
        { name: 'Phở tái nạm', price: 55000, qty: 1, desc: 'Không nấm + ớt chuông xanh' },
        { name: 'Bún thang', price: 52000, qty: 1, desc: 'Không nấm + ớt chuông xanh' }
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

   confirmPayment() {
    if (this.paymentMethod !== "Tiền mặt") {
        alert("Phương thức thanh toán này đang được bảo trì. Vui lòng chọn Tiền mặt.");
        return;
    }

    const ok = confirm("Xác nhận thanh toán tiền mặt khi nhận hàng?");
    if (!ok) return;

    this.processPayment();
    }

    processPayment() {
        alert("Đặt hàng thành công!");
        this.router.navigate(['/detail']);
    }

}
