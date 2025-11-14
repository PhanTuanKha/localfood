import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReviewService } from '../../review';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-review',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './order-review.html',
  styleUrl: './order-review.css',
})
export class OrderReview {
  // Rating
  selectedRating = 0;
  stars = [1, 2, 3, 4, 5];

  // Mô tả đánh giá
  description = '';

  setRating(rating: number): void {
    this.selectedRating = rating;
  }

  // Upload file
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  selectedMedia: { url: string; type: string }[] = [];

  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach(file => {
        const mediaUrl = URL.createObjectURL(file);
        const type = file.type.startsWith('image') ? 'image' : 'video';
        this.selectedMedia.push({ url: mediaUrl, type });
      });
    }
    input.value = '';
  }

  editMedia(index: number) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = (event: any) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const newUrl = URL.createObjectURL(file);
        const type = file.type.startsWith('image') ? 'image' : 'video';

        URL.revokeObjectURL(this.selectedMedia[index].url);
        this.selectedMedia[index] = { url: newUrl, type };
      }
    };
    input.click();
  }

  isImage(media: { url: string; type: string }) {
    return media.type === 'image';
  }

  isVideo(media: { url: string; type: string }) {
    return media.type === 'video';
  }

  constructor(private reviewService: ReviewService, private router: Router) {}

  // Gửi đánh giá: lưu dữ liệu vào service và chuyển sang trang my-review
  onSubmit(event: Event) {
    event.preventDefault();

    this.reviewService.setReview({
      rating: this.selectedRating,
      description: this.description,
      media: this.selectedMedia
    });

    this.router.navigate(['/my-review']);
  }
}

