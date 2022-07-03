import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Member[];

  // TODO: 引数で定義する方法はdependency injection (DI)と呼ぶ。詳しく調べる。
  constructor(private memberService: MemberService) {}

  // MEMO: データの取得はngOnInit内で行う。constructor内ではない。
  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }
}
