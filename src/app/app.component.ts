import { Component } from '@angular/core';
import { NullValidationHandler, OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { AppConfigService } from './init-config';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  public claims: any;
  public token: any;
  public hasValidAccessToken: boolean = false;
  constructor(private oauthService: OAuthService, private configs: AppConfigService) {
    this.configure();
    this.claims = this.oauthService.getAccessToken();
    //this.setupAutomaticSilentRefresh();
    this.token = this.oauthService.getAccessToken();
  }

  authConfig: AuthConfig = {
    issuer: this.configs.getConfig().KEYCLOAK_URL+'/'+this.configs.getConfig().KEYCLOAK_REALM,
    redirectUri: window.location.origin + '/'+this.configs.getConfig().KEYCLOAK_REALM,
    clientId: this.configs.getConfig().KEYCLOAK_CLIENTID,
    //dummyClientSecret: '2ea5dc66-8e1c-4e7c-aac0-52a42594a6ac',
    scope: 'openid profile email offline_access '+this.configs.getConfig().KEYCLOAK_REALM,
    responseType: 'code',
    requireHttps: false,
    // at_hash is not present in JWT token
    disableAtHashCheck: true,
    //postLogoutRedirectUri: window.location.origin + "/heroes",
    showDebugInformation: true
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  //   private setupAutomaticSilentRefresh() {
  //     this.oauthService.setupAutomaticSilentRefresh();
  //   }

  public name() {
    this.claims = this.oauthService.getIdentityClaims();
    console.log(this.claims);
    if (!this.claims) return null;
    return this.claims;
  }

  public validAccessToken() {
    this.hasValidAccessToken = this.oauthService.hasValidAccessToken();
    console.log(this.hasValidAccessToken);
  }

  public getToken() {
    console.log(this.claims = this.oauthService.getIdToken());
     
  }
}
