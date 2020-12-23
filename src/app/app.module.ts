import { NgModule, APP_INITIALIZER }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { InMemoryDataService }  from './in-memory-data.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessagesComponent }    from './messages/messages.component';
import { AppConfigService } from './init-config';

export function initConfig(appConfig: AppConfigService){
  return ()=>appConfig.loadConfig();
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
          // allowedUrls: ['http://localhost:9090/api'],
          sendAccessToken: true
      }
  })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  providers:[{
    provide: APP_INITIALIZER,
    useFactory: initConfig,
    multi: true,
    deps: [AppConfigService]
  }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
