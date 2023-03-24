import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as TodosActions from './todos.actions';
import { TodosEntity } from './todos.models';

export const TODOS_FEATURE_KEY = 'todos';

export interface TodosState extends EntityState<TodosEntity> {
  selectedId?: number;
  loaded: boolean;
  error?: string | null;
}

export interface TodosPartialState {
  readonly [TODOS_FEATURE_KEY]: TodosState;
}

export const todosAdapter: EntityAdapter<TodosEntity> =
  createEntityAdapter<TodosEntity>();

export const initialTodosState: TodosState = todosAdapter.getInitialState({
  loaded: false,
});

const reducer = createReducer(
  initialTodosState,
  on(TodosActions.initTodos, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TodosActions.loadTodosSuccess, (state, { todos }) =>
    todosAdapter.setAll(todos, { ...state, loaded: true })
  ),
  on(TodosActions.loadTodosFailure, (state, { error }) => ({ ...state, error }))
);

export function todosReducer(state: TodosState | undefined, action: Action) {
  return reducer(state, action);
}
