import { Component, OnInit } from '@angular/core';
import {CallDataService} from '../../../../services/jam/call-data.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-rest-information',
  templateUrl: './rest-information.component.html',
  styleUrls: ['./rest-information.component.scss']
})
export class RestInformationComponent implements OnInit {
  restInformation: any;
  params: any;
  formsData: any = {};
  formsDataTwe: any = {};
  edit = false;
  description: any;
  newDate!: string;
  lastDate!: string;
  constructor(private callApi: CallDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void  {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.ngGetRestInformation();
      this.ngConvertDate();
    });
    this.getDescription();
  }

  getDescription(): void {
    this.edit = false;
    const data = {
      tableName: 'FSOtherInformation'
    };
    this.callApi.getJamDescription(data).subscribe((des => {
      this.description = des.msg;
    }));
  }

  ngGetRestInformation(): void {
    const data = {
      Kind: 'Jam105',
      MasterCode: this.params.get('id')
    };
    this.edit = false;
    this.formsData = {};
    this.formsDataTwe = {};
    this.callApi.getJam(data).subscribe((FirmContract => {
      this.restInformation = FirmContract.msg;
      if (this.restInformation.length > 0) {
        this.edit = true;
        for (const index in this.restInformation) {
          if (this.restInformation[index].TypeCode == 1) {
            this.formsData = this.restInformation[index];
          } else if (this.restInformation[index].TypeCode == 2) {
            this.formsDataTwe = this.restInformation[index];
          }
        }
      }
    }));
  }

  sendRestInformation(dataValue: any, dataTwe: any, action: string): void {
    const insert = dataValue;
    if (Object.keys(insert).length > 0) {
      insert.action = action;
      if (action === '1') {
        insert.TypeCode = '1';
        insert.UnitContractGcode = this.params.id;
      }
      this.callApi.operationsRestInformatio({data: insert}).subscribe((balanceSheet => {
        if (balanceSheet.state) {
          this.snackBar.open(balanceSheet.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
        } else {
          this.snackBar.open(balanceSheet.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error'
          });
        }
      }));
      dataTwe.action = action;
      dataTwe.TypeCode = '2';
      if (action === '1') {
        dataTwe.UnitContractGcode = this.params.id;
      }
      this.callApi.operationsRestInformatio({data: dataTwe}).subscribe((balanceSheet => {
        if (balanceSheet.state) {
          this.ngGetRestInformation();
          this.snackBar.open(balanceSheet.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
        } else {
          this.snackBar.open(balanceSheet.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error'
          });
        }
      }));
    } else {
      this.snackBar.open('تمامی فیلد ها خالی است.', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
    }

  }

  isNegitive(val: number): boolean {
    if (val < 0) {
      return true;
    } else {
      return false;
    }
  }

  ngConvertDate(): void  {
    let year = '';
    let month = '';
    let day = '';
    const date = this.params.get('date');
    const date2 = JSON.stringify(Number(this.params.get('date')) - 10000);
    year = date.slice(0, 4) + '/';
    month = date.slice(4, 6) + '/';
    day = date.slice(6, 8);
    this.newDate =  year + month + day;
    year = date2.slice(0, 4) + '/';
    month = date2.slice(4, 6) + '/';
    day = date2.slice(6, 8);
    this.lastDate = year + month + day;
  }

}
