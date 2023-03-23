import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as TodosActions from './todos.actions';

import { catchError, map, of, switchMap } from 'rxjs';
import { TodosService } from './todos.service';

@Injectable()
export class TodosEffects {
  private actions$ = inject(Actions);
  private todosService = inject(TodosService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.initTodos),
      switchMap(() =>
        this.todosService.getTodos().pipe(
          map((todos) => TodosActions.loadTodosSuccess({ todos })),
          catchError((error) => {
            console.error('Error', error);
            return of(TodosActions.loadTodosFailure({ error }));
          })
        )
      )
    )
  );
}
