import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReviewService } from '../../review';

@Component({
  selector: 'app-my-review',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-review.html',
  styleUrl: './my-review.css',
})
export class MyReview implements OnInit {
  rating = 0;
  description = '';
  media: { url: string; type: string }[] = [];

  constructor(public reviewService: ReviewService, private router: Router) {}

  ngOnInit() {
    const data = this.reviewService.getReview();
    if (!data) {
      // Nếu chưa có dữ liệu, quay lại trang đánh giá
      this.router.navigate(['/order-review']);
      return;
    }

    this.rating = data.rating;
    this.description = data.description;
    this.media = data.media;
  }

  getStarsArray() {
    return Array.from({ length: 5 }, (_, i) => i < this.rating);
  }



  
  showConfirmPopup = false;
  openConfirmPopup() {
    this.showConfirmPopup = true;
  }
  cancelDelete() {
    this.showConfirmPopup = false;
  }
  confirmDelete() {
    this.reviewService.clearReview();
    this.showConfirmPopup = false;
  }
}
