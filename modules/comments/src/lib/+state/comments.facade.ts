import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CommentsActions from './comments.actions';
import * as CommentsSelectors from './comments.selectors';

@Injectable()
export class CommentsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(CommentsSelectors.selectCommentsLoaded));
  allComments$ = this.store.pipe(select(CommentsSelectors.selectAllComments));

  init() {
    this.store.dispatch(CommentsActions.initComments());
  }

  reset() {
    this.store.dispatch(CommentsActions.resetComments());
  }
}
