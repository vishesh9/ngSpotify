import { SharedserviceService } from './../../Services/sharedservice.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './../../Services/search.service';
import { Component, OnInit, AfterViewInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, AfterViewInit {
  id: string;
  isLoading: boolean;
  allTracks: any[] = [];
  albumName: Object;
  constructor(private searchService: SearchService, private _route: ActivatedRoute,
    private _http: HttpClient, private sharedSvc: SharedserviceService) { }

  ngAfterViewInit() {
    this.isLoading = false;
  }

  ngOnInit() {
    this.checkIfLoaded();

    this._route.params.subscribe(params => {
      this.id = params['id'];
      // this.searchService.getAccessToken();
      this.getAlbum(this.id);
      this.getAlbumSongs(this.id);
    });
  }

  getAlbum(id: string) {
    this.searchService.getAlbum(this.id).subscribe(res => {
      if (res['status'] === 400) {
        return;
      } else {
        this.albumName = res;
      }
    });
  }

  getAlbumSongs(id: string) {
    this.searchService.getAlbumSongs(id).subscribe(res => {
      this.allTracks = res['items'];
      console.log(res);
    });
  }

  checkIfLoaded() {
    window.addEventListener('load', () => {
      console.log('All resources finished loading!');
    });
    this.isLoading = true;
  }

  firePlay(trackName: string, preview_url: string) {
    this.sharedSvc.changeSong(trackName, preview_url);
  }
}
