import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  imports: [CommonModule],
  templateUrl: './help.html',
  styleUrl: './help.css',
})
export class Help {
  faqs = [
    { q: 'Làm sao để đặt món?', a: 'Chọn món → Thêm vào giỏ → Thanh toán.' },
    { q: 'Có thể hủy đơn hàng không?', a: 'Bạn có thể hủy trước khi nhà hàng xác nhận.' },
    { q: 'Thanh toán hỗ trợ hình thức nào?', a: 'Tiền mặt, chuyển khoản, MoMo, ZaloPay.' }
  ];

  openIndex = -1;

  toggleFAQ(i: number) {
    this.openIndex = this.openIndex === i ? -1 : i;
  }
}