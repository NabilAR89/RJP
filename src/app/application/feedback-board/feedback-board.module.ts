import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedbackBoardRoutingModule } from './feedback-board-routing.module';
import { FeedbackBoardComponent } from './feedback-board.component';
import { FeedbackBoardService } from 'src/app/core/services/feedback-board.service';
import { SortingService } from 'src/app/core/services/sorting.service';

@NgModule({
  imports: [SharedModule, FeedbackBoardRoutingModule],
  declarations: [FeedbackBoardComponent],
  exports: [FeedbackBoardComponent],
  providers: [FeedbackBoardService, SortingService],
})
export class FeedbackBoardModule {}
