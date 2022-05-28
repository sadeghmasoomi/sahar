import {Component, Inject, OnInit} from '@angular/core';
import {CallDataMembersService} from '../../../../services/members/call-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-info-image-update',
  templateUrl: './user-info-image-update.component.html',
  styleUrls: ['./user-info-image-update.component.scss']
})
export class UserInfoImageUpdateComponent implements OnInit {
  formData: any = {};
  fileData!: File;
  previewUrl: any = null;
  constructor(private callData: CallDataMembersService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UserInfoImageUpdateComponent>,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void  {
    this.formData = this.data;
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

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };

  }

  onSubmit(): void  {
    this.formData.action = 2;
    this.formData.Picture = this.previewUrl;
    this.callData.UserInfoImageUpdate(this.formData).subscribe((res) => {});
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
