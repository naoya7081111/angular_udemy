import { Component, OnInit } from '@angular/core';
import {
  AngularFireList,
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/database';
import { User } from 'src/app/class/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ac-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userRef: AngularFireList<User>;
  users$: Observable<User[]>;

  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list('/users');
  }

  ngOnInit(): void {
    this.users$ = this.userRef.snapshotChanges().pipe(
      map((snapshots: SnapshotAction<User>[]) => {
        return snapshots.map((snapshots) => {
          const values = snapshots.payload.val();
          return new User(values);
        });
      })
    );
  }
}
