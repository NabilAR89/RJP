import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FeedbackBoardService {
  private currentSortingSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  public setCurrentSorting(sortBy: string | null) {
    this.currentSortingSubject.next(sortBy);
  }

  public getCurrentSorting(): Observable<string | null> {
    return this.currentSortingSubject.asObservable();
  }

  getFeedbackList(): Observable<any> {
    return this.http.get('./assets/data/feedback-list.json');
  }
}
