import { Component } from '@angular/core';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {UserInfoLanguage} from '../../../model/UserInfoLanguage/user-info-language';

@Component({
  selector: 'app-user-info-language',
  templateUrl: './user-info-language.component.html',
  styleUrls: ['./user-info-language.component.scss']
})
export class UserInfoLanguageComponent {
  UserInfoLanguage!: any;
  displayedColumns = [
    'LanguageName',
    'Conversation',
    'Reading',
    'Translation',
    'Writing',
  ];

  constructor(private callData: CallDataMembersService) {
    this.ngUserInfoLanguage();
  }

  ngUserInfoLanguage(): void  {
    this.callData.UserInfoLanguage().subscribe((res) => {
      if (res.state) {
        this.UserInfoLanguage = res.msg;
      }
    });
  }
}
