import { PostsEntity } from './posts.models';
import {
  initialPostsState,
  postsAdapter,
  PostsPartialState,
} from './posts.reducer';
import * as PostsSelectors from './posts.selectors';

describe('Posts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPostsId = (it: PostsEntity) => it.id;
  const createPostsEntity = (id: number, title = '') =>
    ({
      id,
      title: title || `title-${id}`,
    } as PostsEntity);

  let state: PostsPartialState;

  beforeEach(() => {
    state = {
      posts: postsAdapter.setAll(
        [createPostsEntity(1), createPostsEntity(2), createPostsEntity(3)],
        {
          ...initialPostsState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Posts Selectors', () => {
    it('selectAllPosts() should return the list of Posts', () => {
      const results = PostsSelectors.selectAllPosts(state);
      const selId = getPostsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = PostsSelectors.selectEntity(state) as PostsEntity;
      const selId = getPostsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectPostsLoaded() should return the current "loaded" status', () => {
      const result = PostsSelectors.selectPostsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectPostsError() should return the current "error" state', () => {
      const result = PostsSelectors.selectPostsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
