import { MockBuilder, MockRender } from 'ng-mocks';
import { AlbumsComponent } from './albums.component';
import { AlbumsModule } from '@nx-demo/modules/albums';

describe(AlbumsComponent.name, () => {
  beforeEach(() => MockBuilder([AlbumsComponent], [AlbumsModule]));

  it('should render', () => {
    const component = MockRender(AlbumsComponent).point.componentInstance;

    expect(component).toBeTruthy();
  });
});
