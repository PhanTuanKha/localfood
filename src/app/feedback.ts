import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private description: string = '';
  private media: string[] = [];

  setDescription(desc: string) {
    this.description = desc;
  }

  getDescription(): string {
    return this.description;
  }

  setMedia(media: string[]) {
    this.media = media;
  }

  getMedia(): string[] {
    return this.media;
  }

  addMedia(item: string) {
    this.media.push(item);
  }
}