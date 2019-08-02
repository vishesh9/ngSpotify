import { SharedserviceService } from './../../Services/sharedservice.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './../../Services/search.service';
import { Component, OnInit, AfterViewInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit, AfterViewInit {
  id: string;
  isLoading: boolean;
  allTracks: any[] = [];
  artistName: Object;
  constructor(private searchService: SearchService, private _route: ActivatedRoute,
    private _http: HttpClient, private sharedSvc: SharedserviceService) { }

  ngAfterViewInit() {
    this.isLoading = false;
  }
  ngOnInit() {
    this.checkIfLoaded();

    this._route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      // this.searchService.getAccessToken();
      this.getArtists(this.id);
      this.getArtistDetails(this.id);
    });
  }
  getArtists(id: string) {
    this.searchService.getArtist(this.id).subscribe(res => {
      if (res['status'] === 400) {
        return;
      } else {
        this.artistName = res;
      }
    });
  }
  getArtistDetails(id: string) {
    this.searchService.getArtistDetails(this.id).subscribe(res => {
      if (res['status'] === 400) {
        return;
      } else {
        this.allTracks = res['tracks'];
      }
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
