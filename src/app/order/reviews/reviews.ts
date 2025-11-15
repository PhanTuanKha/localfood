import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews {
showReportPopup = false;
selectedReason: string = '';
otherReason: string = '';

openReportPopup() {
  this.showReportPopup = true;
}

closeReportPopup() {
  this.showReportPopup = false;
  this.selectedReason = '';
  this.otherReason = '';
}

submitReport() {
  let reason = this.selectedReason;

  if (reason === 'other') {
    reason = this.otherReason;
  }

  console.log("Lý do báo cáo:", reason);

  this.closeReportPopup();
}
}
