import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CommentsActions from './comments.actions';
import { CommentsEntity } from './comments.models';

export const COMMENTS_FEATURE_KEY = 'comments';

export interface CommentsState extends EntityState<CommentsEntity> {
  selectedId?: number;
  loaded: boolean;
  error?: string | null;
}

export interface CommentsPartialState {
  readonly [COMMENTS_FEATURE_KEY]: CommentsState;
}

export const commentsAdapter: EntityAdapter<CommentsEntity> =
  createEntityAdapter<CommentsEntity>();

export const initialCommentsState: CommentsState =
  commentsAdapter.getInitialState({
    loaded: false,
  });

const reducer = createReducer(
  initialCommentsState,
  on(CommentsActions.initComments, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CommentsActions.loadCommentsSuccess, (state, { comments }) =>
    commentsAdapter.setAll(comments, { ...state, loaded: true })
  ),
  on(CommentsActions.loadCommentsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CommentsActions.resetComments, () => initialCommentsState)
);

export function commentsReducer(
  state: CommentsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
