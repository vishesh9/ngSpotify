import { SearchService } from './../../Services/search.service';
import { SharedserviceService } from './../../Services/sharedservice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private sharedSvc: SharedserviceService, private router: Router,
    private searchSvc: SearchService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.sharedSvc.changeLogOut();
  }
  login() {
    this.searchSvc.doAuthorization();
    // this.router.navigate(['newReleases']);
    // this.sharedSvc.changeLogIn();
  }
}
