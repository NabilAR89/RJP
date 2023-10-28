import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FeedbackBoardService {
  constructor(private http: HttpClient) {}

  getFeedbackList(): Observable<any> {
    return this.http.get('./assets/data/feedback-list.json');
  }
}
