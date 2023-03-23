import { Component, inject } from '@angular/core';
import { PostsFacade } from '../../+state/posts/posts.facade';

@Component({
  selector: 'nx-demo-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  private postsFacade = inject(PostsFacade);

  posts$ = this.postsFacade.allPosts$;
}
