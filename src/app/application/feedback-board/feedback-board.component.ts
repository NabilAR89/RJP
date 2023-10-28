import { Component, OnInit } from '@angular/core';
import { FeedbackContract } from 'src/app/core/models/feedback.contract';
import { sortingOptionContract } from 'src/app/core/models/sorting-option.contract';
import { FeedbackBoardService } from 'src/app/core/services/feedback-board.service';
import { SortingService } from 'src/app/core/services/sorting.service';

@Component({
  selector: 'app-feedback-board',
  templateUrl: './feedback-board.component.html',
})
export class FeedbackBoardComponent implements OnInit {
  public feedbackList: FeedbackContract[] = [];
  public sortingList: sortingOptionContract[] = [];

  constructor(
    private feedbackBoardService: FeedbackBoardService,
    private sortingService: SortingService
  ) {}

  ngOnInit(): void {
    this.getFeedbackList();
    this.getSortingList();
  }

  private getFeedbackList(): void {
    this.feedbackBoardService.getFeedbackList().subscribe((data: any) => {
      this.feedbackList = data;
    });
  }

  private getSortingList(): void {
    this.sortingService.getSortingList().subscribe((data: any) => {
      this.sortingList = data;
      console.log(this.sortingList);
    });
  }
}
