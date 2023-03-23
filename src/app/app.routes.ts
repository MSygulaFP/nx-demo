import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('@nx-demo/modules/posts').then((m) => m.PostsModule),
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('@nx-demo/modules/albums').then((m) => m.AlbumsModule),
  },
  {
    path: 'todos',
    loadChildren: () =>
      import('@nx-demo/modules/todos').then((m) => m.TodosModule),
  },
];
