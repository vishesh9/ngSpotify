import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  access_token = '';
  private redirectURL = 'http://localhost:4200/newReleases';
  private redirectURLProd = 'https://ngspotify-1bcc0.firebaseapp.com/newReleases';
  private clientID = 'c8ebf6acea6f469fa96fb9b89a2b2c53';
  private clientSecret = '15f7edc1f642406895408fe6ec9fe4cd';
  constructor(private _http: HttpClient, private router: Router) {
    if (window.location.hostname === 'localhost') {
      this.redirectURL = this.redirectURL;
    } else {
      this.redirectURL = this.redirectURLProd;
    }
  }

  getAccessToken(): Promise<any> {
    const headers = ({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': ('Basic ' + btoa(this.clientID + ':' + this.clientSecret)),
    });
    const urlSearchParams = ({
      'grant_type': 'client_credentials'
    });
    const tokenURL = 'https://accounts.spotify.com/api/token/';

    return new Promise((resolve, reject) => {
      this._http.post(tokenURL, urlSearchParams, { headers: headers }).subscribe(result => {
        localStorage.setItem('access_token', (result['access_token']));
        console.log(result);
        resolve(result);
      });
    });
  }

  getAuthAccessToken(code: string): Promise<any> {
    const headers = ({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': ('Basic ' + btoa(this.clientID + ':' + this.clientSecret)),
      'Access-Control-Allow-Origin': '*'
    });
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'authorization_code');
    urlSearchParams.append('code', code);
    urlSearchParams.append('redirect_uri', this.redirectURL);

    const tokenURL = 'https://accounts.spotify.com/api/token';

    return new Promise((resolve, reject) => {
      this._http.post(tokenURL, urlSearchParams.toString(), { headers: headers }).subscribe(result => {
        localStorage.setItem('access_token', (result['access_token']));
        localStorage.setItem('refresh_token', (result['refresh_token']));
        console.log(result);
        resolve(result);
      });
    });
  }

  searchArtists(artist: string) {
    this.access_token = localStorage.getItem('access_token') === null ? '' : localStorage.getItem('access_token');
    const artistURL = 'https://api.spotify.com/v1/search?type=track%2Cartist&limit=10&q=';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': ('Bearer ' + this.access_token)
    };
    const url = artistURL + artist;
    return this._http.get<any>(url, { headers: headers });
  }

  getNewReleases(): Promise<any> {
    this.access_token = localStorage.getItem('access_token') === null ? '' : localStorage.getItem('access_token');
    const releasesURL = 'https://api.spotify.com/v1/browse/new-releases?Country=US';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': ('Bearer ' + this.access_token)
    };
    return new Promise((resolve, reject) => {
      this._http.get(releasesURL, { headers: headers }).subscribe(result => {
        resolve(result);
      });
    });
  }

  getArtistDetails(id: string) {
    this.access_token = localStorage.getItem('access_token') === null ? '' : localStorage.getItem('access_token');
    const getArtistURL = 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': ('Bearer ' + this.access_token)
    };
    return this._http.get(getArtistURL, { headers: headers });
  }

  getArtist(id: string) {
    this.access_token = localStorage.getItem('access_token') === null ? '' : localStorage.getItem('access_token');
    const artistURl = 'https://api.spotify.com/v1/artists/' + id;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': ('Bearer ' + this.access_token)
    };
    return this._http.get(artistURl, { headers: headers });
  }

  getAlbum(id: string) {
    this.access_token = localStorage.getItem('access_token') === null ? '' : localStorage.getItem('access_token');
    const albumURl = 'https://api.spotify.com/v1/albums/' + id;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': ('Bearer ' + this.access_token)
    };
    return this._http.get(albumURl, { headers: headers });
  }

  getAlbumSongs(id: string) {
    this.access_token = localStorage.getItem('access_token') === null ? '' : localStorage.getItem('access_token');
    const albumSongsURl = ' https://api.spotify.com/v1/albums/' + id + '/tracks?market=US';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': ('Bearer ' + this.access_token)
    };
    return this._http.get(albumSongsURl, { headers: headers });
  }

  doAuthorization() {
    const link = 'https://accounts.spotify.com/en/authorize?client_id=' + this.clientID +
      '&response_type=code&redirect_uri=' + this.redirectURL;
    window.open(link, '_self');
  }
}
