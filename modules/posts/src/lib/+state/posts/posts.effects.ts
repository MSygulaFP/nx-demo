import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as PostsActions from './posts.actions';
import { initPosts } from './posts.actions';

import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { PostsService } from './posts.service';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { PostsFacade } from '@nx-demo/modules/posts';
import { Store } from '@ngrx/store';
import { selectRouteParam } from '../../../../../../src/app/store/+state/router/router.selectors';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);
  private postsFacade = inject(PostsFacade);
  private store = inject(Store);

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

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
      withLatestFrom(this.postsFacade.loaded$),
      filter(([action, loaded]) => this.isOnPosts(action) && !loaded),
      map(() => initPosts())
    )
  );

  selectPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
      withLatestFrom(this.store.select(selectRouteParam('id'))),
      filter(([action, id]) => this.isOnPosts(action) && !!id),
      map(([, id]) => PostsActions.selectPost({ postId: Number(id) }))
    )
  );

  private isOnPosts(action: RouterNavigationAction) {
    return action.payload.routerState.url.includes('/posts');
  }
}
