import { CommonModule} from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail implements OnInit, AfterViewInit, AfterViewChecked {


  currentStep = 0;


  steps = [
    {
      icon: "bi bi-calendar3-fill",
      text: "Đơn hàng vừa<br>được xác nhận",
      description: "Chúng tôi đã tiếp nhận đơn hàng của bạn."
    },
    {
      icon: "bi bi-shop",
      text: "Đang chuẩn bị đơn hàng",
      description: "Nhà hàng đang chuẩn bị món ăn cho bạn."
    },
    {
      icon: "bi bi-truck",
      text: "Đang giao hàng",
      description: "Tài xế đang trên đường giao hàng."
    },
    {
      icon: "bi bi-check-circle-fill",
      text: "Đã giao thành công",
      description: "Cảm ơn bạn đã sử dụng dịch vụ!"
    }
  ];


  ngOnInit() {
    this.autoProgress();
  }


  autoProgress() {
    let interval = setInterval(() => {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 3500);
  }


  ngAfterViewInit() {
    document.documentElement.style.setProperty('--step', this.currentStep.toString());
  }


  ngAfterViewChecked() {
    document.documentElement.style.setProperty('--step', this.currentStep.toString());
  }
}

