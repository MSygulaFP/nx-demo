import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as CommentsActions from './comments.actions';
import { CommentsEffects } from './comments.effects';
import { CommentsFacade } from './comments.facade';
import { CommentsEntity } from './comments.models';
import {
  COMMENTS_FEATURE_KEY,
  commentsReducer,
  CommentsState,
} from './comments.reducer';

interface TestSchema {
  comments: CommentsState;
}

describe('CommentsFacade', () => {
  let facade: CommentsFacade;
  let store: Store<TestSchema>;
  const createCommentsEntity = (id: number, name = ''): CommentsEntity =>
    ({
      id,
      name: name || `name-${id}`,
    } as CommentsEntity);

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COMMENTS_FEATURE_KEY, commentsReducer),
          EffectsModule.forFeature([CommentsEffects]),
        ],
        providers: [CommentsFacade],
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
      facade = TestBed.inject(CommentsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allComments$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allComments$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadCommentsSuccess` to manually update list
     */
    it('allComments$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allComments$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CommentsActions.loadCommentsSuccess({
          comments: [createCommentsEntity(1), createCommentsEntity(2)],
        })
      );

      list = await readFirst(facade.allComments$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
