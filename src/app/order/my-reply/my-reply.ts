import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeedbackService } from '../../feedback';

@Component({
  selector: 'app-my-reply',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-reply.html',
  styleUrl: './my-reply.css',
})
export class MyReply implements OnInit {
  replyText: string = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.replyText = this.feedbackService.getDescription() || 'Cảm ơn bạn đã ủng hộ';
  }
}