import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import {
  SortingLabelEnum,
  SortingOptionEnum,
} from 'src/app/core/models/enums/sorting.enum';
import { FeedbackContract } from 'src/app/core/models/feedback.contract';
import { sortingOptionContract } from 'src/app/core/models/sorting-option.contract';
import { FeedbackBoardService } from 'src/app/core/services/feedback-board.service';
import { SortingService } from 'src/app/core/services/sorting.service';

@Component({
  selector: 'app-feedback-board',
  templateUrl: './feedback-board.component.html',
})
export class FeedbackBoardComponent implements OnInit, OnDestroy {
  public feedbackList: FeedbackContract[] = [];
  public sortingList: sortingOptionContract[] = [];
  public form: FormGroup = new FormGroup({});
  public subscription: Subscription = new Subscription();
  readonly storageHelper = new StorageHelper();

  constructor(
    private feedbackBoardService: FeedbackBoardService,
    private sortingService: SortingService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getFeedbackList();
    this.getSortingList();
  }

  private getFeedbackList(): void {
    this.feedbackBoardService.getFeedbackList().subscribe({
      next: (data) => {
        this.feedbackList = data;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.initForm();
      },
    });
  }

  private getSortingList(): void {
    this.sortingService.getSortingList().subscribe({
      next: (data) => {
        this.sortingList = data;
      },
      error: (e) => console.error(e),
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      sortBy: new FormControl(SortingOptionEnum.mostUpvotes),
    });

    this.subscription = this.form
      .get('sortBy')
      ?.valueChanges.subscribe((res) => {
        if (res) {
          this.storageHelper.set('sortBy', res);
          this.sortFeedbackList(res);
        }
      }) as Subscription;

    this.fillForm();
  }

  private fillForm(): void {
    if (
      this.storageHelper.check('sortBy') &&
      this.storageHelper.get('sortBy')
    ) {
      this.form.patchValue({
        sortBy: this.storageHelper.get('sortBy'),
      });
    } else {
      this.sortFeedbackList(SortingOptionEnum.mostUpvotes);
    }
  }

  private sortFeedbackList(sortOption: string) {
    switch (sortOption) {
      case SortingOptionEnum.leastComments:
        this.sortListDesc(SortingLabelEnum.comments);
        break;

      case SortingOptionEnum.leastUpvotes:
        this.sortListDesc(SortingLabelEnum.upvotes);
        break;

      case SortingOptionEnum.mostComments:
        this.sortListAsc(SortingLabelEnum.comments);
        break;

      case SortingOptionEnum.mostUpvotes:
        this.sortListAsc(SortingLabelEnum.upvotes);
        break;

      default:
        this.sortListAsc(SortingLabelEnum.upvotes);
        break;
    }
  }

  private sortListDesc(option: string): void {
    if (option === SortingLabelEnum.upvotes) {
      this.feedbackList = this.feedbackList.sort(
        (a, b) => a.upvotes! - b.upvotes!
      );
    }

    if (option === SortingLabelEnum.comments) {
      this.feedbackList = this.feedbackList.sort(
        (a, b) => a.comments! - b.comments!
      );
    }
  }

  private sortListAsc(option: string) {
    if (option === SortingLabelEnum.upvotes) {
      this.feedbackList = this.feedbackList.sort(
        (a, b) => b.upvotes! - a.upvotes!
      );
    }

    if (option === SortingLabelEnum.comments) {
      this.feedbackList = this.feedbackList.sort(
        (a, b) => b.comments! - a.comments!
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
