import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import{HttpClientModule} from '@angular/common/http';
import{DiffMatchPatchModule} from 'ng-diff-match-patch';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoundPipe } from './pipes/round.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RoundPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DiffMatchPatchModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
