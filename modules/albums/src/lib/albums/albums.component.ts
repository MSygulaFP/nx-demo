import { Component, inject, OnInit } from '@angular/core';
import { AlbumsFacade } from '../+state/albums.facade';

@Component({
  selector: 'nx-demo-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  private albumsFacade = inject(AlbumsFacade);

  albums$ = this.albumsFacade.allAlbums$;

  ngOnInit() {
    this.albumsFacade.init();
  }
}
