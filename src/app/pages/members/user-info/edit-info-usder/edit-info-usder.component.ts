import {Component, Inject} from '@angular/core';
import {CallDataMembersService} from '../../../../services/members/call-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-info-usder',
  templateUrl: './edit-info-usder.component.html',
  styleUrls: ['./edit-info-usder.component.scss']
})
export class EditInfoUsderComponent {
  description: any;
  formData: any = {};
  datePickerConfig: any = {
    format: 'jYYYYjMMjDD'
  };
  constructor(private callData: CallDataMembersService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditInfoUsderComponent>,
              private snackBar: MatSnackBar) {
    this.getDescription();
  }

  getDescription(): void {
    const data = {
      tableName: 'UserInfo'
    };
    this.callData.getDescription(data).subscribe((des: any) => {
      this.description = des.msg;
      if (this.data.Action === 2) {
        this.formData = {
          FatherName: this.data.msg.FatherName,
          BirthJDate: this.data.msg.BirthJDate,
          GnrSexName: this.data.msg.GnrSexName,
          GnrReligionName: this.data.msg.ReligionGCode,
          GnrMarriedName: this.data.msg.MarriedGCode,
          GnrmilitaryName: this.data.msg.MilitaryGCode,
          ContactPost: this.data.msg.ContactPost,
          Description: this.data.msg.Description,
          GnrCityName: this.data.msg.IdCityName,
          InsuranceCode: this.data.msg.InsuranceCode,
          HomeAddress: this.data.msg.HomeAddress,
          GnrStateGCode_Home: this.data.msg.GnrStateGCode_Home,
          GnrCityGCode_Home: this.data.msg.GnrCityGcode_Home,
          HomeZipCode: this.data.msg.HomeZipCode,
          HomeTel: this.data.msg.HomeTel,
          IdNumber: this.data.msg.IdNumber,
          InsuranceID: this.data.msg.InsuranceID,
          GnrInsuranceGCode: this.data.msg.InsuranceKindGCode,
          LatinFirstName: this.data.msg.LatinFirstName,
          LatinLastName: this.data.msg.LatinLastName,
          GnrMarriedGCode: this.data.msg.GnrMarriedGCode,
          MilitaryEndJdate: this.data.msg.MilitaryEndJdate,
          GnrMilitaryGCode: this.data.msg.GnrMilitaryGCode,
          OldFamilyName: this.data.msg.OldFamilyName,
          GnrReligionGCode: this.data.msg.GnrReligionGCode,
          WorkAddress: this.data.msg.WorkAddress,
          GnrStateGCode_Work: this.data.msg.GnrStateGCode_Work,
          GnrCityGCode_Work: this.data.msg.GnrCityGCode_Work,
          WorkFax: this.data.msg.WorkFax,
          HomeFax: this.data.msg.HomeFax,
          WorkPostBox: this.data.msg.WorkPostBox,
          WorkTel: this.data.msg.WorkTel,
          WorkZipCode: this.data.msg.WorkZipCode,
          AuditDocNo: this.data.msg.AuditDocNo,
          AuditDocJdate: this.data.msg.AuditDocJdate,
          DocNo: this.data.msg.DocNo,
          DocJdate: this.data.msg.DocJdate,
          StartJdate: this.data.msg.StartJdate,
          NationalCode: this.data.msg.NationalCode,
          GnrCityGcode_Id: this.data.msg.CityGcode_Id,
          GnrCityGcode_Birth: this.data.msg.GnrCityGcode_Birth,
          City_BirthGCode: this.data.msg.City_BirthGCode,
          GnrAddressLocateName: this.data.msg.GnrAddressLocateName,
          Action: this.data.Action,
        };
      }
      this.formData.Action = this.data.Action;
      this.formData.UserGCode = this.data.UserGCode;
    });
  }

  ngUserInfoUpdate(): void {
    this.callData.UserInfoUpdate(this.formData).subscribe( (res) => {
      if (res.state){
        this.snackBar.open(res.msg, 'x', {
          duration: 6000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
        this.onNoClick();
      }
    });
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
