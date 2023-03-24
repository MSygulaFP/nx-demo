import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as PostsActions from './posts.actions';
import { PostsEntity } from './posts.models';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsState extends EntityState<PostsEntity> {
  selectedId?: number;
  loaded: boolean;
  error?: string | null;
}

export interface PostsPartialState {
  readonly [POSTS_FEATURE_KEY]: PostsState;
}

export const postsAdapter: EntityAdapter<PostsEntity> =
  createEntityAdapter<PostsEntity>();

export const initialPostsState: PostsState = postsAdapter.getInitialState({
  loaded: false,
});

const reducer = createReducer(
  initialPostsState,
  on(PostsActions.initPosts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PostsActions.loadPostsSuccess, (state, { posts }) =>
    postsAdapter.setAll(posts, { ...state, loaded: true })
  ),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PostsActions.selectPost, (state, { postId }) => ({
    ...state,
    selectedId: postId,
  }))
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return reducer(state, action);
}
