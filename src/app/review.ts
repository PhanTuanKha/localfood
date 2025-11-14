import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private jsonUrl = 'assets/data/reviews.json';

  constructor(private http: HttpClient) {}

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }




  
  private reviewData: any = null;

  setReview(data: any) {
    this.reviewData = data;
  }

  getReview() {
    return this.reviewData;
  }

  clearReview() {
    this.reviewData = null;
  }
}
