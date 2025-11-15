import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support',
  imports: [CommonModule, FormsModule],
  templateUrl: './support.html',
  styleUrl: './support.css',
})
export class Support {
  message = "";
  contactEmail = "";
  contactPhone = "";
  issueType = "";
  success = false;
  isLoading = false;

  sendSupport(form: any) {
    if (!this.message || !this.contactEmail || !this.issueType || !this.contactPhone) {
      return;
    }

    const phonePattern = /^[0-9]{9}$/;
    if (!phonePattern.test(this.contactPhone)) {
      this.showToast('Số điện thoại không hợp lệ. Vui lòng nhập đúng 9 chữ số.');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.success = true;
      this.isLoading = false;

      // Reset form
      form.resetForm();

      this.showToast('Yêu cầu hỗ trợ đã gửi thành công!');

      setTimeout(() => this.success = false, 5000);
    }, 1500);
  }

  private showToast(message: string): void {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.className = 'support-toast';
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }
}
