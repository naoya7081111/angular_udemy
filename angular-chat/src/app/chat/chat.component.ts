import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from '../class/comment';
import { User } from '../class/user';
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/database';

const CURRENT_USER: User = new User(1, 'マリリン・マンソン');
const ANOTHER_USER: User = new User(2, '武井 壮');

@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  currentUser = CURRENT_USER;
  comment = '';

  constructor(private db: AngularFireDatabase) {
    this.commentsRef = db.list('/comments');
    this.comments$ = this.commentsRef.snapshotChanges().pipe(
      map((snapshots: SnapshotAction<Comment>[]) => {
        return snapshots.map((snapshots) => {
          const value = snapshots.payload.val();
          return new Comment({ key: snapshots.payload.key, ...value });
        });
      })
    );
  }

  ngOnInit(): void {}

  addComment(comment: string): void {
    if (comment) {
      this.commentsRef.push(
        new Comment({ user: this.currentUser, message: comment })
      );
      this.comment = '';
    }
  }

  updateComment(comment: Comment): void {
    const { key, message } = comment;
    this.commentsRef.update(key, { message });
  }
  deleteComment(comment: Comment): void {
    this.commentsRef.remove(comment.key);
  }
}
