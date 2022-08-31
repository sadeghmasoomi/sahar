import { Component, OnInit } from '@angular/core';
import {CallDataMembersService} from '../../../services/members/call-data.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-firm-auditor',
  templateUrl: './add-firm-auditor.component.html',
  styleUrls: ['./add-firm-auditor.component.scss']
})
export class AddFirmAuditorComponent implements OnInit {
  forms: any;
  formData: any = {};
  params: any;
  edit = false;
  datePickerConfig = {
    format: 'jYYYYjMMjDD'
  };
  lastCode!: string;
  constructor(private callData: CallDataMembersService, private snackBar: MatSnackBar, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
    });
    this.getForms();
    this.lastCode =  JSON.parse(sessionStorage.getItem('lastFirm') as string);
  }

  getForms(): void {
    this.callData.getAddFirmForm().subscribe((res: any) => {
      sessionStorage.setItem('filters', JSON.stringify(res.msg));
      this.forms = res.msg;
      if (this.params.get('id')){
        const id = this.params.get('id');
        this.getFirms(id);
      }
    });
  }

  getFirms(id: string): void {
    this.edit = true;
    const data = {
      Kind: 'Firm101S',
      MasterCode: id,
    };
    this.callData.getFirms(data).subscribe((firms) => {
      this.formData = firms.msg[0];
      if (this.formData) {
        if (this.formData.GnrFirmstatusGcode) {
          const GnrFirmstatusGcode = this.forms.find((element: any) => element.enName === 'GnrFirmstatusGcode');
          const GnrFirmstatusGcodeValue = GnrFirmstatusGcode.data.find((element: any) => element.Name === this.formData.GnrFirmstatusGcode);
          if (GnrFirmstatusGcodeValue) {
          this.formData.GnrFirmstatusGcode = GnrFirmstatusGcodeValue.Value;
          }
        }
        if (this.formData.GnrFirmkindGcode) {
          const GnrFirmkindGcode = this.forms.find((element: any) => element.enName === 'GnrFirmkindGcode');
          const GnrFirmkindGcodeValue = GnrFirmkindGcode.data.find((element: any) => element.Name === this.formData.GnrFirmkindGcode);
          if (GnrFirmkindGcodeValue) {
          this.formData.GnrFirmkindGcode = GnrFirmkindGcodeValue.Value;
          }
        }
      }
    });
  }

  sendFirmNew(data: any): void {
    data.action = 1;
    this.callData.sendFirmAction(data).subscribe((res: any) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {

          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
        this.formData = {};
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

  update(data: any): void {
    data.action = 2;
    this.callData.sendFirmAction(data).subscribe((res: any) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {

          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
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
      this.forms = JSON.parse(sessionStorage.getItem('filters') as string);
    }
  }
}
