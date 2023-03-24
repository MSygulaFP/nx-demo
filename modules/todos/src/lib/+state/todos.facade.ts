import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as TodosActions from './todos.actions';
import * as TodosSelectors from './todos.selectors';

@Injectable()
export class TodosFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(TodosSelectors.selectTodosLoaded));
  allTodos$ = this.store.pipe(select(TodosSelectors.selectAllTodos));
  uncompletedTodos$ = this.store.pipe(
    select(TodosSelectors.selectUncompletedTodos)
  );
  completedTodos$ = this.store.pipe(
    select(TodosSelectors.selectCompletedTodos)
  );

  init() {
    this.store.dispatch(TodosActions.initTodos());
  }
}
