import { SharedserviceService } from './../../Services/sharedservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.scss']
})
export class MusicplayerComponent implements OnInit {
  song: string;
  url: string;
  constructor(private sharedSvc: SharedserviceService) { }

  ngOnInit() {
    this.sharedSvc.currentSong.subscribe(song => this.song = song);
    this.sharedSvc.currentUrl.subscribe(url => this.url = url);
  }

}
