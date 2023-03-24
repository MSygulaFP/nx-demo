import { MockBuilder, MockRender } from 'ng-mocks';
import { TodosComponent } from './todos.component';
import { TodosModule } from '@nx-demo/modules/todos';

describe(TodosComponent.name, () => {
  beforeEach(() => MockBuilder([TodosComponent], [TodosModule]));

  it('should render', () => {
    const component = MockRender(TodosComponent).point.componentInstance;

    expect(component).toBeTruthy();
  });
});
