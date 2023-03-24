import { MockBuilder, MockRender } from 'ng-mocks';
import { CommentsComponent } from './comments.component';
import { CommentsFacade } from '@nx-demo/modules/comments';

describe(CommentsComponent.name, () => {
  beforeEach(() => MockBuilder([CommentsComponent], [CommentsFacade]));

  it('should render', () => {
    const component = MockRender(CommentsComponent).point.componentInstance;

    expect(component).toBeTruthy();
  });
});
