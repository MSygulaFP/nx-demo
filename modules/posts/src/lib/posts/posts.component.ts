import { Component, inject, OnInit } from '@angular/core';
import { PostsFacade } from '../+state/posts.facade';

@Component({
  selector: 'nx-demo-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  private postsFacade = inject(PostsFacade);

  ngOnInit() {
    this.postsFacade.init();
  }
}
