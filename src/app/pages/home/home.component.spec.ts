import { MockBuilder, MockRender } from 'ng-mocks';
import { HomeComponent } from '@app/pages/home/home.component';

describe(HomeComponent.name, () => {
  beforeEach(() => MockBuilder(HomeComponent));

  it('should render', () => {
    const component = MockRender(HomeComponent).point.componentInstance;

    expect(component).toBeTruthy();
  });
});
