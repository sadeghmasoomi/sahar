import {Component, Inject, OnInit} from '@angular/core';
import {CallDataMembersService} from '../../../../services/members/call-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-info-resume-update',
  templateUrl: './user-info-resume-update.component.html',
  styleUrls: ['./user-info-resume-update.component.scss']
})
export class UserInfoResumeUpdateComponent implements OnInit {
  formData: any = {};
  datePickerConfig: any = {
    format: 'jYYYYjMMjDD'
  };
  fileData!: File;
  previewUrl: any = null;
  constructor(private callData: CallDataMembersService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UserInfoResumeUpdateComponent>,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.data) {
      this.formData = {
        GCode: this.data.GCode,
        UserGCode: this.data.UserGCode,
        WorkName: this.data.WorkName,
        JobName: this.data.JobName,
        WorkSide: this.data.WorkSide,
        WorkKind: this.data.WorkKind,
        GnrJobRelatedGCode: this.data.GnrJobRelatedGCode,
        StartDate: this.data.StartDate,
        FirmInfoHdrGcode: this.data.FirmInfoHdrGcode,
        EndDate: this.data.EndDate,
        Comment: this.data.Comment
      };
    }
  }


  fileProgress(fileInput: any): void {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview():void {
    const mimeType = this.fileData.type;
    if (!mimeType.match(/pdf\/*/) && mimeType.match('image/jpeg') && mimeType.match('image/png')) {
      return;
    }
    this.formData.AttachmentType = mimeType;
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };

  }

  onSubmit(): void {
    this.formData.action = 2;
    this.formData.Attachment = this.previewUrl;
    if (this.formData) {
      this.callData.UserInfoResumeUpdate(this.formData).subscribe((res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 6000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.onNoClick();
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
    } else {
      this.snackBar.open('تمامی فیلد ها خالی می باشد لطفا فیلد ها را پر کنید.', 'x', {
        duration: 6000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
    }
  }

  dateMode(value: string , name: string): void {
    const val = value.replace('/', '');
    const val2 = val.replace('/', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
