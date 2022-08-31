import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CallDataService} from "../../../services/sahar/call-data.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})
export class ContractEditComponent {
  contracts!: MatTableDataSource<any>;
  formData: any = {};
  active!: boolean;
  formContract: any;
  columnsToDisplay = [
    'row',
    'ActivityName',
    'amount',
    'BudjetHorse',
    'DurationDateStart',
    'DurationDateEnd',
    'DurationPer',
    'TreatyDate',
    'TreatyNo',
    'operation',
  ];
  textValue!: string;
  datePickerConfig!: {
    format: 'jYYYYjMMjDD'
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private callData: CallDataService, private snackBar: MatSnackBar) {

  }

  ngGetContractInfoOlds(text: string): void {
    // this.active = false;
    // this.formData = {};
    this.textValue = text;
    const data = {
      Kind: 'E101',
      FV1: text
    };
    this.callData.getCustomerInfoOld(data).subscribe((res) => {
      this.contracts = new MatTableDataSource<any>(res.msg);
      this.contracts.paginator = this.paginator;
    });
  }

  initContract(data: any): void {
    this.active = true;
    this.formData = data;
    if (!this.formContract) {
      this.ngContractForm();
    }
  }

  ngContractForm(): void {
    this.callData.contractFormEditJameye().subscribe((formContract) => {
      this.formContract = formContract.msg;
    });
  }

  updateContract(): void {
    if (confirm('برای ویرایش این قرارداد اطمینان دارید ؟')) {
      this.formData.Action = 101;
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
          this.ngGetContractInfoOlds(this.textValue);
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
  }

  dateMode(value: string, name: string): void {
    const val = value.replace('-', '');
    const val2 = val.replace('-', '');
    if (val2) {
      this.formData[name] = val2;
    }
  }

}
