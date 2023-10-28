import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SortingService {
  constructor(private http: HttpClient) {}

  getSortingList(): Observable<any> {
    return this.http.get('./assets/data/sorting-options.json');
  }
}
