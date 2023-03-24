import { Action } from '@ngrx/store';

import * as TodosActions from './todos.actions';
import { TodosEntity } from './todos.models';
import { initialTodosState, todosReducer, TodosState } from './todos.reducer';

describe('Todos Reducer', () => {
  const createTodosEntity = (id: number, title = ''): TodosEntity =>
    ({
      id,
      title: title || `title-${id}`,
    } as TodosEntity);

  describe('valid Todos actions', () => {
    it('loadTodosSuccess should return the list of known Todos', () => {
      const todos = [createTodosEntity(1), createTodosEntity(2)];
      const action = TodosActions.loadTodosSuccess({ todos });

      const result: TodosState = todosReducer(initialTodosState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = todosReducer(initialTodosState, action);

      expect(result).toBe(initialTodosState);
    });
  });
});
