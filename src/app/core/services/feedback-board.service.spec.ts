import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackBoardService } from './feedback-board.service';
import { FeedbackContract } from '../models/feedback.contract';

describe('FeedbackBoardService', () => {
  let service: FeedbackBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [FeedbackBoardService],
    });
    service = TestBed.inject(FeedbackBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve the list of users', () => {
    service.getFeedbackList().subscribe((feedbackItems) => {
      expect(feedbackItems.length).toBe(6);
    });
  });
});
