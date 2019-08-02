import { SearchService } from './../../Services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    // this.searchService.getAccessToken();

  }


}
