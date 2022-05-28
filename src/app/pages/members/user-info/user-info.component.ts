import {Component, Inject} from '@angular/core';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GetUser, userSingleData} from '../../../model/getUser/get-user';
import { DomSanitizer } from '@angular/platform-browser';
import { EditInfoUsderComponent } from './edit-info-usder/edit-info-usder.component';
import { UserInfoImageUpdateComponent } from './user-info-image-update/user-info-image-update.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  user!: userSingleData;
  userDetails!: GetUser;
  userImages: any;

  constructor(private snackBar: MatSnackBar,
              private callData: CallDataMembersService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngGetUserInfo();
  }

  ngGetUserInfo(): void {
    const data = {
      locationGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
    };
    this.callData.getUser(data).subscribe((user) => {
        if (user.msg[0]) {
          this.user = user.msg[0];
        }
    });
  }

  ngGetUserData(GCode: string): void {
    const data = {
      MasterCode: GCode
    };
    this.callData.UserDetails(data).subscribe(res => {
      if (res.state && res.msg) {
        this.userDetails = res.msg[0];
        if (this.userDetails) {
          this.ngGetUserImages();
        }
      }
    });
  }

  ngGetUserImages(): void {
    this.callData.UserImages().subscribe( (userImages) => {
      if (userImages.msg.length) {
        for (const index of userImages.msg) {
          if (index.Picture) {
            index.encodePicture =  this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
              + index.Picture);
          }
        }
        this.userImages = userImages.msg;
      }
    });
  }

  edit(action: number): void  {
    const dialogRef = this.dialog.open(EditInfoUsderComponent,
      {
        width: '650px',
        data: {msg : this.userDetails, Action: action, UserGCode: this.user.GCode},
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetUserData(this.user.GCode);
    });
  }

  editImages(item: any): void  {
    const dialogRef = this.dialog.open(UserInfoImageUpdateComponent,
        {
          width: '650px',
          data: item,
        });
    dialogRef.afterClosed().subscribe(result => {
      this.ngGetUserImages();
    });
  }
}
