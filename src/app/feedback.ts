import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private description: string = '';

  setDescription(desc: string) {
    this.description = desc;
  }

  getDescription(): string {
    return this.description;
  }
}
