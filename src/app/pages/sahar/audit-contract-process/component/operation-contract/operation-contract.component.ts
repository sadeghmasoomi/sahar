import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Params} from '../../../../../model/params/params';
import {CallDataService} from '../../../../../services/sahar/call-data.service';

@Component({
  selector: 'app-operation-contract',
  templateUrl: './operation-contract.component.html',
  styleUrls: ['./operation-contract.component.scss']
})
export class
OperationContractComponent implements OnInit {
  formContract: any;
  formData: any = {};
  params!: Params;
  saveValue = '';
  name: any;
  NationalID: any;
  coTypeCode = 2;
  countMember!: number;
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };

  constructor(private callData: CallDataService, private snackBar: MatSnackBar, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.formData.Name = '';
      this.formData.NationalID = '';
      this.params = params.params;
      this.ngContractForm();
    });
  }

  ngContractForm(): void {
    this.callData.contractForm().subscribe((formContract: any) => {
      this.formContract = formContract.msg;
    });
  }

  addContract(): void {
    this.formData.Action = 1;
    this.formData.FirmInfoGCode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
    this.callData.operationContract(this.formData).subscribe((res: any) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
        this.router.navigate(['/Sahar/AuditContractProcess']);
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

  checkValue(name: string, item: any): void {
    if (name === 'SignCount') {
      this.countMember = item.value;
    }
    this.saveValue = item.value;
  }

  getCompany(companyId: string, customerTypeValue: any): void {
    let data = {};
    data = {
      NationalID: companyId,
      CoTypeCode: customerTypeValue
    };

    this.callData.getCompany(data).subscribe((res: any) => {
      if (res.state) {
        this.formData.Name = res.msg[0].Name;
        this.formData.NationalID = res.msg[0].NationalID;
        this.formData.CoInfoGCode = res.msg[0].GCode;
        this.formData.LastAmount = res.msg[0].LastAmount;
        this.formData.LastAuditor = res.msg[0].LastAuditor;
        this.formData.LastYear = res.msg[0].LastYear;
      } else {
        this.snackBar.open(res.msg, 'x', {
          duration: 15000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
      }
    });
  }

  dateMode(value: string, name: string): void {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }

}
