import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  userActivityCollection: AngularFirestoreCollection<any> = this.db.collection('user-activity');
  userRelationsCollection: AngularFirestoreCollection<any> = this.db.collection('user-relation');

  constructor(private http: HttpClient, private db: AngularFirestore) { }

  addUserActivity(matchData) {
    console.log('coming here');
    return this.userActivityCollection.add(matchData);
  }

  addUserRelation(relationData) {
    return this.userRelationsCollection.add(relationData);
  }

  checkUserNotified(searchObject): Observable<any[]> {
    console.log('called checkUserNotified');
    return this.db.collection(
      'user-activity',
      ref => ref.where('user_profile_id', '==', searchObject.user_profile_id)
                .where('partner_profile_id', '==', searchObject.partner_profile_id)
                .where('status', '==', searchObject.status)
                .where('type', '==', searchObject.type)

    )
    .snapshotChanges();
  }
}
