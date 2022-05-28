import {Component, Inject} from '@angular/core';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {UserEducation} from '../../../model/UserEducation/user-education';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UserEducationUpdateComponent} from './user-education-update/user-education-update.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-info-education',
  templateUrl: './user-info-education.component.html',
  styleUrls: ['./user-info-education.component.scss']
})
export class UserInfoEducationComponent {
  // UserEducation
  UserEducations: any;
  params: any;
  constructor(private callData: CallDataMembersService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.ngUserEducation();
    });
  }

  base64ToArrayBuffer(base64: string): any {
    let binarystring = base64.replace(/\\n/g, '');
    binarystring =  window.atob(base64);
    const len = binarystring.length;
    const bytes = new Uint8Array( len );
    for (let i = 0; i < len; i++)        {
      bytes[i] = binarystring.charCodeAt(i);
    }
    return bytes.buffer;
  }

  ngUserEducation(): void  {
    const data = {
      MasterCode: this.params.get('id')
    };
    this.callData.UserEducation(data).subscribe((UserEducations) => {
      if (UserEducations.state) {
        this.UserEducations = UserEducations.msg;
        for (const item of UserEducations.msg) {
          if (item.AttachmentType === 'image/jpeg' || item.AttachmentType === 'image/png') {
            item.Attachment =  this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                + item.Attachment);
          }
        }
      }
    });
  }

  edit(Action: number, item?: any): void  {
    const data = {
      item,
      Action,
      UserGCode: this.params.get('id')
    };
    if (Action === 1) {
      data.item = false;
    }
    const dialogRef = this.dialog.open(UserEducationUpdateComponent,
        {
          width: '650px',
          data
        });
    dialogRef.afterClosed().subscribe(result => {
      this.ngUserEducation();
    });
  }

  delete(item: any): void {
    const data = {
      Action: 3,
      UserGCode: this.params.get('id'),
      GCode: item.GCode,
    };
    this.callData.userEducationUpdate(data).subscribe((res) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          duration: 6000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
        this.ngUserEducation();
      } else {
        this.snackBar.open(res.msg, 'x', {
          duration: 6000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
      }
    });
  }

}
