import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodosEntity } from '../../+state/todos.models';

@Component({
  selector: 'nx-demo-todos-list',
  templateUrl: 'todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  @Input() todos: TodosEntity[] = [];
  @Input() title = '';
}
