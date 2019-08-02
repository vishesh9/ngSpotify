import { Router } from '@angular/router';
import { SharedserviceService } from './../../Services/sharedservice.service';
import { FormControl } from '@angular/forms';
import { MusicplayerComponent } from './../musicplayer/musicplayer.component';
import { Component, OnInit } from '@angular/core';
import { Artist } from './../../Models/Artists';
import { SearchService } from './../../Services/search.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  show: boolean;
  isLoggedIn: boolean;
  searchValue: string = null;
  txtArtist: FormControl = new FormControl();
  searchResults: Artist[];
  constructor(private searchService: SearchService, private sharedSvc: SharedserviceService, private router: Router) { }
  ngOnInit() {
    this.sharedSvc.login.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.show = false;
    // this.searchService.getAccessToken();
  }

  checkArtistBox() {
    this.show = true;
    // this.sharedSvc.currentShow.subscribe(show => {
    //   this.show = show;
    // });
    if (this.txtArtist.value === '') {
      this.searchResults = [];
    } else {
      this.searchService.searchArtists(this.txtArtist.value)
        .subscribe(result => {
          if (result.status === 400) {
            return;
          } else {
            this.searchResults = result.artists.items;
          }
        });
    }
  }
  hideDiv() {
    this.show = false;
    this.searchValue = '';
    // this.sharedSvc.changeShow();
    // this.sharedSvc.currentShow.subscribe(show => {
    //   this.show = show;
    // });
  }
  logOff() {
    this.sharedSvc.changeLogOut();
    this.router.navigate(['login']);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
