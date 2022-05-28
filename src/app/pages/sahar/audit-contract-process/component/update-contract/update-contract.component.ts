import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CallDataService} from '../../../../../services/sahar/call-data.service';

@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.scss']
})
export class UpdateContractComponent implements OnInit {
  company: any;
  params: any;
  formContract: any;
  formData: any = {};
  countMember!: number;
  saveValue = '';
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  constructor(private callData: CallDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.ngGetSingleContract();
      this.ngContractForm();
    });
  }

  ngContractForm(): void {
    this.callData.contractForm().subscribe((formContract) => {
      this.formContract = formContract.msg;
    });
  }

  ngGetSingleContract(): void {
    const data = {
      MasterCode: this.params.get('id')
    };

    this.callData.getSingleContract(data).subscribe((company) => {
      this.company = company.msg;
      this.formData  = this.company[0];
      this.countMember = this.company[0].SignCount;
    });
  }

  checkValue(name: string, item: any): void {
    if (name === 'SignCount') {
      this.countMember = item.value;
    }
    this.saveValue = item.value;
  }

  updateContract(): void {
    this.formData.Action = 2;
    this.formData.FirmInfoGCode = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
    this.callData.ContractUpdate(this.formData).subscribe((res) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-success'
        });
        this.ngGetSingleContract();
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

  dateMode(value: string, name: string): void {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }
}
