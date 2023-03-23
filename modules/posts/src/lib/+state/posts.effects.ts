import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as PostsActions from './posts.actions';

import { catchError, map, of, switchMap } from 'rxjs';
import { PostsService } from './posts.service';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.initPosts),
      switchMap(() =>
        this.postsService.getPosts().pipe(
          map((posts) => PostsActions.loadPostsSuccess({ posts })),
          catchError((error) => {
            console.error('Error', error);
            return of(PostsActions.loadPostsFailure({ error }));
          })
        )
      )
    )
  );
}
