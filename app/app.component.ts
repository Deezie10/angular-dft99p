const ROOT_PATH = "groups/NXfFvMfA6bg";
import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import '@firebase/functions';

// for demo / debugging
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular 6';
  public rawData = null;
  public queryString = null;
  public data = null;
  public isError = false;
  public error = null;

  constructor(private db:AngularFireDatabase, public auth:AngularFireAuth,
        private http:HttpClient) {
     this.getRawData().then(data => this.rawData = data);
  }

  public signIn(userid) {
     this.resetData();
     console.log('auth', userid);
     const email = `${userid}@${userid}.com`;
     this.auth.auth.signInWithEmailAndPassword(email, userid+userid).then(
       res => {
          
       }
     ).catch(e => this.handleError(e));
  }

  public signOut() {
    this.auth.auth.signOut();
  }

  resetData() {
    this.data = null;
    this.isError = false;
    this.queryString = null;
  }

  handleError(e) {
     this.isError = true;
     this.error = e;
     return of(e + '');
  }

  queryStudents(uuidc) {
    this.resetData();

    this.queryString = "this.db.list('/students', ref => ref.orderByChild('uuidc').equalTo('" + uuidc + "')).valueChanges()";

    // fetch students for uuidc with query
    this.data = this.db.list(`${ROOT_PATH}/students`, 
      ref => ref.orderByChild('uuidc').equalTo(uuidc))
      .valueChanges()
      .pipe(catchError(e => this.handleError(e)))

  }

  getRecord(userid) {
    this.resetData();
    this.queryString = "this.db.object('/students/" + userid
      + "').valueChanges()";

    this.data = this.db.object(`${ROOT_PATH}/students/${userid}`)
      .valueChanges()
      .pipe(catchError(e => this.handleError(e)));
  }

  getUserPrefix(user) {
    // console.log(user.uid);
    const shortId = user.uid.substr(0,6);
    const prefix = user.email.replace(/@.*$/, '');
    return `${prefix} (${shortId}...)`;
  }

  // bypasses security rules by getting raw data from
  // a Cloud Function with admin privs
  getRawData() {
    const path = '/groups/NXfFvMfA6bg';
    return firebase.functions().httpsCallable('readRaw')({path: path})
      .then(result => result.data);
  }
}
