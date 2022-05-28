import {Component, Inject, OnInit} from '@angular/core';
import {CallDataMembersService} from '../../../../services/members/call-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-education-update',
  templateUrl: './user-education-update.component.html',
  styleUrls: ['./user-education-update.component.scss']
})
export class UserEducationUpdateComponent implements OnInit {
  formData: any = {};
  active = false;
  datePickerConfig: any = {
    format: 'jYYYYjMMjDD'
  };
  fileData!: File;
  previewUrl: any = null;
  constructor(private callData: CallDataMembersService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UserEducationUpdateComponent>,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void  {
    if (this.data.item) {
      this.formData = {
        GCode: this.data.item.GCode,
        GnrCountryGCode: Number(this.data.item.CountryGCode),
        GnrEducationDegreeGCode: Number(this.data.item.EducationDegreeGCode),
        GnrUnivertsityTypeGCode: Number(this.data.item.UnivertsityTypeGCode),
        UniversityName: this.data.item.UniversityName,
        EducationSubject: this.data.item.EducationSubject,
        EducationEndDate: this.data.item.EducationEndDate,
        Comment: this.data.item.Comment
      };
    }
  }


  fileProgress(fileInput: any): void  {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview(): void  {
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

  onSubmit(): void  {
    this.formData.Action = this.data.Action;
    this.formData.UserGCode = this.data.UserGCode;
    this.formData.Attachment = this.previewUrl;
    if (this.formData) {
      this.callData.userEducationUpdate(this.formData).subscribe((res) => {
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

  dateMode(value: string , name: string): void  {
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
