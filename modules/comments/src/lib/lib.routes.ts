import { Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromComments from './+state/comments.reducer';
import { CommentsEffects } from './+state/comments.effects';
import { CommentsFacade } from './+state/comments.facade';
import { CommentsComponent } from './pages/comments/comments.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export const commentsRoutes: Route[] = [
  {
    path: '',
    component: CommentsComponent,
    providers: [
      CommentsFacade,
      importProvidersFrom(
        StoreModule.forFeature(
          fromComments.COMMENTS_FEATURE_KEY,
          fromComments.commentsReducer
        ),
        EffectsModule.forFeature([CommentsEffects]),
        HttpClientModule
      ),
    ],
  },
];
