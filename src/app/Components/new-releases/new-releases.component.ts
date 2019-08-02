import { SharedserviceService } from './../../Services/sharedservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './../../Services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.scss']
})
export class NewReleasesComponent implements OnInit {

  code: string;
  show: boolean;
  flag: number;
  newReleases: any[] = [];
  constructor(private searchService: SearchService, private _route: ActivatedRoute,
    private router: Router, private sharedSvc: SharedserviceService) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (params['code']) {
        this.code = params['code'];
        this.sharedSvc.changeLogIn();
      } else if (params['error']) {
        this.router.navigate(['login']);
      }
    });
    // this.searchService.getAuthAccessToken(this.code).then(success => {
    //   this.getNewReleases();
    // });
    this.searchService.getAccessToken().then(success => {
      this.getNewReleases();
    });
  }

  getNewReleases() {
    this.searchService.getNewReleases().then(result => {
      if (result['status'] === 400) {
        return;
      } else {
        this.newReleases = result['albums'].items;
        // console.log(this.newReleases);
      }
    });
  }

}
