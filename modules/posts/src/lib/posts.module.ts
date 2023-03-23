import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './pages/posts/posts.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPosts from './+state/posts/posts.reducer';
import { PostsEffects } from './+state/posts/posts.effects';
import { PostsFacade } from './+state/posts/posts.facade';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: ':id',
    component: DetailsComponent,
  },
];

@NgModule({
  declarations: [PostsComponent, PostListItemComponent, DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromPosts.POSTS_FEATURE_KEY, fromPosts.postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
  exports: [RouterModule],
  providers: [PostsFacade],
})
export class PostsModule {}
