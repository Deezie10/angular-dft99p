import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

const config = {
    apiKey: "AIzaSyCyTvIbaFK2WuLjkS_ktNa-E9KKyu9MePs",
    authDomain: "kato-bug.firebaseapp.com",
    databaseURL: "https://kato-bug.firebaseio.com",
    storageBucket: "kato-bug.appspot.com",
    messagingSenderId: "838511635295",
    projectId: "kato-bug"
};

@NgModule({
  imports:      [ 
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
