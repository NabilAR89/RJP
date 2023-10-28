import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'feedback-board',
  },

  {
    path: 'feedback-board',
    loadChildren: () =>
      import('./application/feedback-board/feedback-board.module').then(
        (m) => m.FeedbackBoardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
