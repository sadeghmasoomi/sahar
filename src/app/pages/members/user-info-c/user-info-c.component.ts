import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CallDataMembersService} from '../../../services/members/call-data.service';

@Component({
  selector: 'app-user-info-c',
  templateUrl: './user-info-c.component.html',
  styleUrls: ['./user-info-c.component.scss']
})
export class UserInfoCComponent implements OnInit {
  name!: string;
  params: any;
  pageNumber!: number;
  pageCount!: number;
  allUsers: any;
  UserInfoLanguage: any;
  UserEducations: any;
  UserInfoResume: any;
  userImage: any;
  displayedUserInfoLanguages = [
    'LanguageName',
    'Conversation',
    'Reading',
    'Translation',
    'Writing',
  ];
  displayedUserInfoResume = [
    'JobName',
    'JobRelated',
    'StartDate',
    'EndDate',
    'WorkKind',
    'WorkName',
    'WorkSide',
  ];
  constructor(private callData: CallDataMembersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void  {
    this.route.paramMap.subscribe((params: any) => {
      this.params = params.params;
      if (this.params.pageNumber) {
        this.ngGetAllUsers(true);
      } else {
        this.ngGetAllUsers(false);
      }
    });
  }

  ngGetAllUsers(state: boolean): void  {
    this.pageNumber =  1;
    const data  = {
      pageNumber: this.pageNumber,
      FV1: '',
    };
    if (state) {
      this.pageNumber = Number(this.params.pageNumber);
      data.pageNumber = Number(this.params.pageNumber);
    }
    if (this.params) {
      data.FV1 = this.params.nameSearch;
      this.name = this.params.nameSearch;
    }
    this.callData.getAllUsers(data).subscribe((allUsers) => {
      this.allUsers = allUsers.msg;
      const count = allUsers.count / 20;
      this.pageCount = Math.round(count);
    });
  }

  ngGetData(Gcode: string): void  {
    const data = {
      MasterCode: Gcode
    };
    this.callData.UserImages().subscribe((res) => {
      if (res.state) {
        this.userImage = res.msg;
      }
    });
    this.callData.UserEducation().subscribe((res) => {
      if (res.state) {
        this.UserEducations = res.msg;
      }
    });
    this.callData.UserInfoLanguage().subscribe((res) => {
      if (res.state) {
        this.UserInfoLanguage = res.msg;
      }
    });
    this.callData.UserInfoResume().subscribe((res) => {
      if (res.state) {
        this.UserInfoResume = res.msg;
      }
    });
  }

  ngSearch(name: string): void  {
    this.router.navigate(['SaharMember/UserInfoC', 1, name]);
  }

  pageChange(newPage: number): void  {
    if (this.params.nameSearch) {
      const name = this.params.nameSearch;
      this.router.navigate(['SaharMember/UserInfoC', newPage, this.params.nameSearch]).then(r => r);
    } else {
      this.router.navigate(['SaharMember/UserInfoC', newPage]).then(r => r );
    }
  }

}
