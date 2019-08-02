import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  private isLoggedIn = new BehaviorSubject<boolean>(true);
  private song = new BehaviorSubject<string>('');
  private url = new BehaviorSubject<string>('');
  private show = new BehaviorSubject<boolean>(true);
  currentSong = this.song.asObservable();
  currentUrl = this.url.asObservable();
  currentShow = this.show.asObservable();
  login = this.isLoggedIn.asObservable();
  constructor() { }

  changeSong(song: string, url: string) {
    if (url === null) {
      song = 'Non playable song, Get spotify premium first';
    }
    this.song.next(song);
    this.url.next(url);
  }
  changeShow() {
    this.show.next(!this.show);
  }
  changeLogOut() {
    this.isLoggedIn.next(false);
  }
  changeLogIn() {
    this.isLoggedIn.next(true);
  }
}
