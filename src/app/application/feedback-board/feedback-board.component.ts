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

  /* ngOnInit Lifecycle Hook that is called after the constructor is called and after the component's inputs have been initialized */
  ngOnInit(): void {
    this.getFeedbackList();
    this.getSortingList();
  }

  /* Fetch Feedback Data using the feedbackBoardService Class instance.*/
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

  /* Fetch Sorting options Data using the sortingService Class instance.*/
  private getSortingList(): void {
    this.sortingService.getSortingList().subscribe({
      next: (data) => {
        this.sortingList = data;
      },
      error: (e) => console.error(e),
    });
  }

  /* Initialise form fields */
  private initForm() {
    this.form = this.formBuilder.group({
      sortBy: new FormControl(SortingOptionEnum.mostUpvotes),
    });

    /* Subscribe to the 'sortBy' field in the form and return the last updated value on every change. */
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

  /* fill form fields */
  private fillForm(): void {
    /* Check if 'sortBy' property exists in the browser storage. */
    if (
      this.storageHelper.check('sortBy') &&
      this.storageHelper.get('sortBy')
    ) {
      /* If property exists, automatically fill the orm field and update the sorting list. This will help us to catch the latest user change on browser refresh */
      this.form.patchValue({
        sortBy: this.storageHelper.get('sortBy'),
      });
    } else {
      /* If property does not exists, sort by default value: 'most upvotes'*/
      this.sortFeedbackList(SortingOptionEnum.mostUpvotes);
    }
  }

  /* Detect which property should be sorted by */
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

  /* sort by descending order and exact property */
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

  /* sort by ascending order and exact property */
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

  /* ngOnDestroy Lifecycle Hook is called directly before the component instance is destroyed*/
  ngOnDestroy(): void {
    /* Unsubcribe from the subscription to prevent memory leaks */
    this.subscription.unsubscribe();
  }
}
