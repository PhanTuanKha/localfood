import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-group-order-detail',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './group-order-detail.html',
  styleUrl: './group-order-detail.css',
})
export class GroupOrderDetail implements OnInit {

  constructor(private router: Router) {}

  deliveryTime: string = '';
  paymentMethod: string = "Chuyển khoản";

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

  // Lấy phương thức thanh toán từ select
  onPaymentChange(event: any) {
    this.paymentMethod = event.target.value;
  }

  confirmPayment() {

    // Nếu KHÔNG phải tiền mặt → báo bảo trì
    if (this.paymentMethod !== "Tiền mặt") {
      alert("Phương thức này đang được bảo trì. Vui lòng chọn Tiền mặt.");
      return;
    }

    // Xác nhận lại
    const ok = confirm("Xác nhận thanh toán tiền mặt khi nhận hàng?");
    if (!ok) return;

    // Thanh toán thành công ngay
    alert("Đặt hàng thành công!");

    // Chuyển sang trang chi tiết đơn
    this.router.navigate(['/detail']);
  }

}
