import {Component, Inject} from '@angular/core';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {UserInfoResume} from '../../../model/UserInfoResume/user-info-resume';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UserInfoResumeUpdateComponent} from './user-info-resume-update/user-info-resume-update.component';

@Component({
  selector: 'app-user-info-resume',
  templateUrl: './user-info-resume.component.html',
  styleUrls: ['./user-info-resume.component.scss']
})
export class UserInfoResumeComponent {
  UserInfoResume!: any;
  constructor(private callData: CallDataMembersService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngUserInfoResume();
  }



  ngUserInfoResume(): void {
    this.callData.UserInfoResume().subscribe((res) => {
      if (res.state) {
        this.UserInfoResume = res.msg;
        for (const item of this.UserInfoResume) {
          if (item.Attachment) {
            item.Attachment =  this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                + item.Attachment);
          }
        }
      }
    });
  }

  edit(item: any): void {
    const dialogRef = this.dialog.open(UserInfoResumeUpdateComponent,
        {
          width: '650px',
          data: item
        });
    dialogRef.afterClosed().subscribe(result => {
      this.ngUserInfoResume();
    });
  }
}
