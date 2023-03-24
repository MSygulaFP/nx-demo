import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POSTS_FEATURE_KEY, postsAdapter, PostsState } from './posts.reducer';

export const selectPostsState =
  createFeatureSelector<PostsState>(POSTS_FEATURE_KEY);

const { selectAll, selectEntities } = postsAdapter.getSelectors();

export const selectPostsLoaded = createSelector(
  selectPostsState,
  (state: PostsState) => state.loaded
);

export const selectPostsError = createSelector(
  selectPostsState,
  (state: PostsState) => state.error
);

export const selectAllPosts = createSelector(
  selectPostsState,
  (state: PostsState) => selectAll(state)
);

export const selectPostsEntities = createSelector(
  selectPostsState,
  (state: PostsState) => selectEntities(state)
);

export const selectSelectedPostId = createSelector(
  selectPostsState,
  (state: PostsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectPostsEntities,
  selectSelectedPostId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
