import {Component} from '@angular/core';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-member-auditor',
  templateUrl: './add-member-auditor.component.html',
  styleUrls: ['./add-member-auditor.component.scss']
})
export class AddMemberAuditorComponent {
  forms: any;
  formData: any = {};
  filterData: any = {};
  formsFilter: any;
  edit = false;
  datePickerConfig = {
    format: 'jYYYYjMMjDD'
  };
  search!: string;
  lastCode: any;
  constructor(private callData: CallDataMembersService, private snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.lastCode = this.route.snapshot.paramMap.get('lastCode');
    this.getForms();
  }

  getForms(): void {
    this.callData.getMemberForm().subscribe((res: any) => {
      sessionStorage.setItem('filters', JSON.stringify(res.msg));
      this.forms = res.msg;

      if (this.lastCode.length > 10) {
        this.getMember(this.lastCode);
      }
    });
  }

  getMember(id: string): void {
    this.edit = true;
    const data = {
      Kind: 'mem101s',
      MasterCode: id,
    };
    this.callData.getSaharMembers(data).subscribe((member) => {
      this.formData = member.msg[0];
      if (this.formData.IdCityName) {
        const IdCityName = this.forms.find((element: any) => element.enName === 'IdCityGcode');
        const IdCityGcodeValue = IdCityName.data.find((element: any) => element.Name === this.formData.IdCityName);
        if (IdCityGcodeValue) {
          this.formData.IdCityGcode = IdCityGcodeValue.Value;
        }
      }
      if (this.formData.BirthCityName) {
        const BirthCityName = this.forms.find((element: any) => element.enName === 'BirthCityGcode');
        const BirthCityValue = BirthCityName.data.find((element: any) => element.Name === this.formData.BirthCityName);
        if (BirthCityValue) {
          this.formData.BirthCityGcode = BirthCityValue.Value;
        }
      }
      if (this.formData.GnrSexName) {
        const GnrSexName = this.forms.find((element: any) => element.enName === 'GnrSexGCode');
        const GnrSexNameValue = GnrSexName.data.find((element: any) => element.Name === this.formData.GnrSexName);
        if (GnrSexNameValue) {
          this.formData.GnrSexGCode = GnrSexNameValue.Value;
        }
      }
      if (this.formData.GnrReligionName) {
        const GnrReligionName = this.forms.find((element: any) => element.enName === 'GnrReligionGCode');
        const GnrReligionValue = GnrReligionName.data.find((element: any) => element.Name === this.formData.GnrReligionName);
        if (GnrReligionValue) {
          this.formData.GnrReligionGCode = GnrReligionValue.Value;
        }
      }
      if (this.formData.GnrMarriedName) {
        const GnrMarriedName = this.forms.find((element: any) => element.enName === 'GnrMarriedGCode');
        const GnrMarriedValue = GnrMarriedName.data.find((element: any) => element.Name === this.formData.GnrMarriedName);
        if (GnrMarriedValue) {
          this.formData.GnrMarriedGCode = GnrMarriedValue.Value;
        }
      }
      if (this.formData.GnrmilitaryName) {
        const GnrmilitaryName = this.forms.find((element: any) => element.enName === 'GnrmilitaryGCode');
        const GnrmilitaryValue = GnrmilitaryName.data.find((element: any) => element.Name === this.formData.GnrmilitaryName);
        if (GnrmilitaryValue) {
          this.formData.GnrmilitaryGCode = GnrmilitaryValue.Value;
        }
      }
      if (this.formData.GnrCountryName) {
        const GnrCountryName = this.forms.find((element: any) => element.enName === 'GnrCountryGcode');
        const GnrCountryValue = GnrCountryName.data.find((element: any) => element.Name === this.formData.GnrCountryName);
        if (GnrCountryValue) {
          this.formData.GnrCountryGcode = GnrCountryValue.Value;
        }
      }
      if (this.formData.GnrCityName) {
        const GnrCityName = this.forms.find((element: any) => element.enName === 'GnrCityGcode');
        const GnrCityValue = GnrCityName.data.find((element: any) => element.Name === this.formData.GnrCityName);
        if (GnrCityValue) {
          this.formData.GnrCityGcode = GnrCityValue.Value;
        }
      }
      if (this.formData.GnrAddressLocateName) {
        const GnrAddressLocateName = this.forms.find((element: any) => element.enName === 'GnrAddressLocateGcode');
        const GnrAddressLocateValue = GnrAddressLocateName.data.find((element: any) => element.Name === this.formData.GnrAddressLocateName);
        if (GnrAddressLocateValue) {
          this.formData.GnrAddressLocateGcode = GnrAddressLocateValue.Value;
        }
      }
      if (this.formData.GnrAddressLocateName) {
        const MemGroupName = this.forms.find((element: any) => element.enName === 'GroupGcode');
        const MemGroupValue = MemGroupName.data.find((element: any) => element.Name === this.formData.MemGroupName);
        if (MemGroupValue) {
          this.formData.GroupGcode = MemGroupValue.Value;
        }
      }
      if (this.formData.MemGroupRankName) {
        const MemGroupRankName = this.forms.find((element: any) => element.enName === 'GroupRankGcode');
        const MemGroupRankValue = MemGroupRankName.data.find((element: any) => element.Name === this.formData.MemGroupRankName);
        if (MemGroupRankValue) {
          this.formData.GroupRankGcode = MemGroupRankValue.Value;
        }
      }
      // if (this.formData.GnrAddressLocateName) {
      //   const GnrAddressLocateName = this.forms.find((element: any) => element.enName === 'Active');
      //   const GnrAddressLocateValue = GnrAddressLocateName.data.find((element: any) =>
      //   element.Name === this.formData.GnrAddressLocateName);
      //   if (GnrAddressLocateValue) {
      //     this.formData.Active = GnrAddressLocateValue.Value;
      //   }
      // }
    });
  }

  sendMemberNew(valid: NgForm, action?: number): void {
    if (valid.invalid) {
      this.snackBar.open('لطفا تمامی فیلد های ستاره دار را پر کنید.', 'x', {
        duration: 3000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
      return;
    }
    this.formData.action = action;
    this.callData.sendMemberAction(this.formData).subscribe((res: any) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
        action === 1 ?
          this.formData = {} :
          this.getMember(this.lastCode);
      } else {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
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

  filterMyOptions(text: any, index: number): any {
    if (text) {
      this.forms[index].data = this.forms[index].data.filter((a: any) => a.Name.toLowerCase()
        .startsWith(text.toLowerCase()));
    } else {
      this.forms[index].data = JSON.parse(sessionStorage.getItem('filters') as string)[index].data;
    }
  }
}
