import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../app/business.service';

import {
  Event,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'sample-angular-app';
  version = {};
  constructor(private _router: Router, private bs: BusinessService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.bs
      .getVersion()
      .subscribe((data) => {
        this.version = data;
        console.log(this.version)
      });
  }
  private navigationInterceptor(event: Event): void {
  }
}
