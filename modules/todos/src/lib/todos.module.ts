import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './pages/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTodos from './+state/todos.reducer';
import { TodosEffects } from './+state/todos.effects';
import { TodosFacade } from './+state/todos.facade';
import { TodosListComponent } from './components/todos-list/todos-list.component';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromTodos.TODOS_FEATURE_KEY, fromTodos.todosReducer),
    EffectsModule.forFeature([TodosEffects]),
  ],
  exports: [RouterModule],
  declarations: [TodosComponent, TodosListComponent],
  providers: [TodosFacade],
})
export class TodosModule {}
