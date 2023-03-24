import { TodosEntity } from './todos.models';
import {
  initialTodosState,
  todosAdapter,
  TodosPartialState,
} from './todos.reducer';
import * as TodosSelectors from './todos.selectors';

describe('Todos Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTodosId = (it: TodosEntity) => it.id;
  const createTodosEntity = (id: number, title = '') =>
    ({
      id,
      title: title || `title-${id}`,
    } as TodosEntity);

  let state: TodosPartialState;

  beforeEach(() => {
    state = {
      todos: todosAdapter.setAll(
        [createTodosEntity(1), createTodosEntity(2), createTodosEntity(3)],
        {
          ...initialTodosState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Todos Selectors', () => {
    it('selectAllTodos() should return the list of Todos', () => {
      const results = TodosSelectors.selectAllTodos(state);
      const selId = getTodosId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TodosSelectors.selectEntity(state) as TodosEntity;
      const selId = getTodosId(result);

      expect(selId).toBe(2);
    });

    it('selectTodosLoaded() should return the current "loaded" status', () => {
      const result = TodosSelectors.selectTodosLoaded(state);

      expect(result).toBe(true);
    });

    it('selectTodosError() should return the current "error" state', () => {
      const result = TodosSelectors.selectTodosError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
