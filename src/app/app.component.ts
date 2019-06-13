import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../app/business.service';

import { OAuthService } from 'angular-oauth2-oidc';

import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

import { RbacService } from './rbac.service';

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
  logo = require('../assets/shield.png');
  version = {};
  shield = require('../assets/shield.png');
  rbacInfo = null;

  constructor(private _router: Router, private bs: BusinessService, private rbac: RbacService, private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }


  public get role() {
    if (!this.rbacInfo) return null;
    return this.rbacInfo.roles['app-1'];
  }
  public get first() {
    if (!this.rbacInfo) return null;
    return this.rbacInfo.first_name;
  }
  public get last() {
    if (!this.rbacInfo) return null;
    return this.rbacInfo.last_name;
  }
  public get email() {
    if (!this.rbacInfo) return null;
    return this.rbacInfo.email;
  }
  public get provider() {
    if (!this.rbacInfo) return null;
    return this.rbacInfo.provider;
  }

  public login() {
      this.oauthService.initImplicitFlow();
  }

  public logoff() {
      this.rbacInfo = null;
      this.oauthService.logOut();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin({
      onTokenReceived: context => {
        console.debug("Logged in");
        console.debug(context);
        this.rbac.getRbac(context.idToken).subscribe(
          v => {
            this.rbacInfo = v;
            console.debug(v)
          }
        );
      }
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
