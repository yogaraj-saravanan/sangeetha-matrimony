import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { map, catchError } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'assets/';
  prodCollection: AngularFirestoreCollection<any> = this.db.collection('users');

  constructor(private http: HttpClient, private db: AngularFirestore) { }

  configUrl = 'assets/config.json';

  getUsers(): Observable<any[]> {
    return this.db.collection('users').snapshotChanges();
  }

  getUserDetail = (id) => {
    return this.db.collection('users').doc(id).get();
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Node.js server error');
  }

  private updateUserMessageDetail(phoneNumber, user): Observable<any[]> {
    return this.db.collection('users/').valueChanges()
    .pipe(
        catchError(this.handleError)
    );
  }

}
