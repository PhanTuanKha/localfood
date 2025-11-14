import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../feedback';

@Component({
  selector: 'app-reply-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './reply-detail.html',
  styleUrl: './reply-detail.css',
})
export class ReplyDetail {
  @ViewChild('mediaUpload') mediaUploadRef!: ElementRef<HTMLInputElement>;
  selectedImages: string[] = [];
  description: string = '';

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  triggerUpload() {
    this.mediaUploadRef.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach(file => {
        const imageUrl = URL.createObjectURL(file);
        this.selectedImages.push(imageUrl);
      });
    }
    input.value = '';
  }

  editImage(index: number) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);

        URL.revokeObjectURL(this.selectedImages[index]);
        this.selectedImages[index] = imageUrl;
      }
    };
    input.click();
  }

  // Hàm gửi phản hồi, lưu mô tả và chuyển trang
  onSubmit(event: Event) {
    event.preventDefault();
    this.feedbackService.setDescription(this.description);
    this.router.navigate(['/my-reply']);
  }
}