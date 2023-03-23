import { createAction, props } from '@ngrx/store';
import { PostsEntity } from './posts.models';

export const initPosts = createAction('[Posts Page] Init');

export const loadPostsSuccess = createAction(
  '[Posts/API] Load Posts Success',
  props<{ posts: PostsEntity[] }>()
);

export const loadPostsFailure = createAction(
  '[Posts/API] Load Posts Failure',
  props<{ error: any }>()
);

export const selectPost = createAction(
  '[Posts Page] SelectPost',
  props<{ postId: number }>()
);
