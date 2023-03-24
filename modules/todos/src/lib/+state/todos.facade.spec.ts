import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as TodosActions from './todos.actions';
import { TodosEffects } from './todos.effects';
import { TodosFacade } from './todos.facade';
import { TodosEntity } from './todos.models';
import { TODOS_FEATURE_KEY, todosReducer, TodosState } from './todos.reducer';

interface TestSchema {
  todos: TodosState;
}

describe('TodosFacade', () => {
  let facade: TodosFacade;
  let store: Store<TestSchema>;
  const createTodosEntity = (id: number, title = ''): TodosEntity =>
    ({
      id,
      title: title || `title-${id}`,
    } as TodosEntity);

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TODOS_FEATURE_KEY, todosReducer),
          EffectsModule.forFeature([TodosEffects]),
        ],
        providers: [TodosFacade],
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
      facade = TestBed.inject(TodosFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTodos$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTodos$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTodosSuccess` to manually update list
     */
    it('allTodos$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTodos$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TodosActions.loadTodosSuccess({
          todos: [createTodosEntity(1), createTodosEntity(2)],
        })
      );

      list = await readFirst(facade.allTodos$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
