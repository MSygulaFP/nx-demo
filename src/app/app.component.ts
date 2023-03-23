import { Component, inject, OnInit } from '@angular/core';
import { UsersFacade } from './store/+state/users/users.facade';

@Component({
  selector: 'nx-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private usersFacade = inject(UsersFacade);

  ngOnInit() {
    this.usersFacade.init();
  }
}
