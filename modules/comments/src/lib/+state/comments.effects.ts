import { inject, Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import * as CommentsActions from './comments.actions';

import { catchError, filter, map, of, switchMap } from 'rxjs';
import { CommentsService } from './comments.service';
import { Store } from '@ngrx/store';
import { selectSelectedPostId } from '@nx-demo/modules/posts';

@Injectable()
export class CommentsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private commentsService = inject(CommentsService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.initComments),
      concatLatestFrom(() => [this.store.select(selectSelectedPostId)]),
      filter(([, postId]) => Boolean(postId)),
      switchMap(([, postId]) =>
        this.commentsService.getComments(postId ?? 1).pipe(
          map((comments) => CommentsActions.loadCommentsSuccess({ comments })),
          catchError((error) => {
            console.error('Error', error);
            return of(CommentsActions.loadCommentsFailure({ error }));
          })
        )
      )
    )
  );
}
