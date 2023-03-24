import { Component, inject, OnInit } from '@angular/core';
import { TodosFacade } from '../../+state/todos.facade';

@Component({
  selector: 'nx-demo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  private todosFacade = inject(TodosFacade);

  uncompletedTodos$ = this.todosFacade.uncompletedTodos$;
  completedTodos$ = this.todosFacade.completedTodos$;

  ngOnInit() {
    this.todosFacade.init();
  }
}
