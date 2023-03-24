import { MockBuilder, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe(AppComponent.name, () => {
  beforeEach(() =>
    MockBuilder(
      [AppComponent, RouterModule, RouterTestingModule.withRoutes([])],
      [AppModule]
    )
  );

  it('should render', () => {
    const component = MockRender(AppComponent).point.componentInstance;

    expect(component).toBeTruthy();
  });
});
