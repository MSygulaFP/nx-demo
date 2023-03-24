import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as PostsActions from './posts.actions';
import { PostsEffects } from './posts.effects';
import { PostsFacade } from './posts.facade';
import { PostsEntity } from './posts.models';
import { POSTS_FEATURE_KEY, postsReducer, PostsState } from './posts.reducer';

interface TestSchema {
  posts: PostsState;
}

describe('PostsFacade', () => {
  let facade: PostsFacade;
  let store: Store<TestSchema>;
  const createPostsEntity = (id: number, title = ''): PostsEntity =>
    ({
      id,
      title: title || `title-${id}`,
    } as PostsEntity);

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(POSTS_FEATURE_KEY, postsReducer),
          EffectsModule.forFeature([PostsEffects]),
        ],
        providers: [PostsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(PostsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allPosts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allPosts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadPostsSuccess` to manually update list
     */
    it('allPosts$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allPosts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        PostsActions.loadPostsSuccess({
          posts: [createPostsEntity(1), createPostsEntity(2)],
        })
      );

      list = await readFirst(facade.allPosts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
