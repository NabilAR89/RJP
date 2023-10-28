import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackBoardComponent } from './feedback-board.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FeedbackBoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackBoardRoutingModule {}
