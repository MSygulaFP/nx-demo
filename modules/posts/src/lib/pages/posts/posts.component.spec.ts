import { MockBuilder, MockRender } from 'ng-mocks';
import { PostsComponent } from './posts.component';
import { PostsModule } from '@nx-demo/modules/posts';

describe(PostsComponent.name, () => {
  beforeEach(() => MockBuilder([PostsComponent], [PostsModule]));

  it('should render', () => {
    const component = MockRender(PostsComponent).point.componentInstance;

    expect(component).toBeTruthy();
  });
});
