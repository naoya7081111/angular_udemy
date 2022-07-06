import { Component } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, 'マリリン・マンソン');
const ANOTHER_USER: User = new User(2, '武井 壮');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お疲れさまです!'),
  new Comment(ANOTHER_USER, 'この間の件ですがどうなりました?'),
  new Comment(CURRENT_USER, 'お疲れさまです!'),
  new Comment(CURRENT_USER, 'クライアントからOKが出ました'),
];

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  comments = COMMENTS;
  currentUser = CURRENT_USER;
  comment = '';

  addComment(comment: string): void {
    if (comment) {
      this.comments.push(new Comment(this.currentUser, comment));
    }
  }
}
