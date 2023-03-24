import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODOS_FEATURE_KEY, todosAdapter, TodosState } from './todos.reducer';

export const selectTodosState =
  createFeatureSelector<TodosState>(TODOS_FEATURE_KEY);

const { selectAll, selectEntities } = todosAdapter.getSelectors();

export const selectTodosLoaded = createSelector(
  selectTodosState,
  (state: TodosState) => state.loaded
);

export const selectTodosError = createSelector(
  selectTodosState,
  (state: TodosState) => state.error
);

export const selectAllTodos = createSelector(
  selectTodosState,
  (state: TodosState) => selectAll(state)
);

export const selectUncompletedTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => !todo.completed)
);

export const selectCompletedTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => todo.completed)
);

export const selectTodosEntities = createSelector(
  selectTodosState,
  (state: TodosState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectTodosState,
  (state: TodosState) => state.selectedId
);

export const selectEntity = createSelector(
  selectTodosEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
