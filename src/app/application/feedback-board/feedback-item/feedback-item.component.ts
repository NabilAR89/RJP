import { Component, Input } from '@angular/core';
import { faChevronUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { FeedbackContract } from 'src/app/core/models/feedback.contract';

@Component({
  selector: 'app-feedback-item',
  templateUrl: './feedback-item.component.html',
})
export class FeedbackItemComponent {
  @Input() feedbackItem: FeedbackContract = {};
  public isUpvoted = false;

  faChevronUp = faChevronUp;
  faComment = faComment;

  public upvote(): void {
    this.isUpvoted
      ? (this.feedbackItem.upvotes -= 1)
      : (this.feedbackItem.upvotes += 1);

    this.isUpvoted = !this.isUpvoted;
  }
}
