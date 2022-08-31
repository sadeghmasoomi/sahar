import { Component, OnInit } from '@angular/core';
import {CallDataService} from '../../../../services/jam/call-data.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit {
  dataCashFlow: any;
  params: any;
  formsData: any = {};
  formsDataTwe: any = {};
  someOne: any;
  someTwe: any;
  sums: object  = {};
  sums2: object  = {};
  edit = false;
  description: any;
  newDate!: string;
  lastDate!: string;
  constructor(private callApi: CallDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void  {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.ngGetCashFlow();
      this.ngConvertDate();
    });
    this.getDescription();
  }

  getDescription(): void{
    this.edit = false;
    const data = {
      tableName: 'FSCashFlow'
    };
    this.callApi.getJamDescription(data).subscribe((des => {
      this.description = des.msg;
      this.catecolate();
    }));
  }


  ngGetCashFlow(): void{
    const dataVal = {
      Kind: 'Jam104',
      MasterCode: this.params.get('id'),
    };
    this.edit = false;
    this.formsData = {};
    this.formsDataTwe = {};
    this.callApi.getJam(dataVal).subscribe((CashFlow => {
      this.dataCashFlow = CashFlow.msg;
      if (this.dataCashFlow.length > 0){
        this.edit = true;
        for (const index in this.dataCashFlow){
          if (this.dataCashFlow[index].TypeCode === 1){
            this.formsData = this.dataCashFlow[index];
          }else {
            this.formsDataTwe = this.dataCashFlow[index];

          }
        }

      }
    }));
  }

  catecolate(): void {
    if (this.description) {
      for (const i in this.description) {
        for (const j in this.description[i].Titles) {
          for (const x in this.description[i].Titles[j].subTitle) {
            if (!this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName]){
              this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName] = 0;
            }
            if (!this.description[i].Titles[j].subTitle[x].enName) {
              this.formsData[this.description[i].Titles[j].subTitle[x].enName] = 0;
              this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName] = 0;
            }
            if (!this.description[i].Titles[j].subTitle[x].enName) {
              this.formsData[this.description[i].Titles[j].subTitle[x].enName] = 0;
              this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName] = 0;
            }
            if (this.description[i].Titles[j].subTitle[x].disable && this.description[i].Titles[j].subTitle[x].type) {
              const key = this.description[i].Titles[j].subTitle[x].enName;
              this.formsData[key] = 0;
              this.formsDataTwe[key] = 0;
              if (this.description[i].Titles[j].subTitle[x].type === 'Sum-Minus') {
                const values = this.description[i].Titles[j].subTitle[x].value;
                const operation = this.description[i].Titles[j].subTitle[x].operation;
                const le = values.length;
                for (let x = 0; x < le; x++) {
                  if (operation[x] && operation[x] == '-') {
                    this.formsData[key] -= Number(this.formsData[values[x]]);
                    this.formsDataTwe[key] -= Number(this.formsDataTwe[values[x]]);
                  } else {
                    this.formsData[key] += Number(this.formsData[values[x]]);
                    this.formsDataTwe[key] += Number(this.formsDataTwe[values[x]]);
                  }
                }
              } else {
                for (let x = 0; x < this.description[i].Titles[j].subTitle.length - 1; x++) {
                  this.formsData[key] += Number(this.formsData[this.description[i].Titles[j].subTitle[x].enName]);
                  this.formsDataTwe[key] += Number(this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName]);
                }
              }

            }
          }
        }
      }
    }
  }

  sendCashFlow(dataVal: any, dataTwe: any, action: string): void{
    const insert = dataVal;
    if (Object.keys(insert).length > 0){
      insert.action = action;
      if (action === '1') {
        insert.TypeCode = '1';
        insert.UnitContractGcode = this.params.get('id');
      }
      this.callApi.operationsCashFlow(insert).subscribe((balanceSheet => {
        if (balanceSheet.state){
          this.snackBar.open(balanceSheet.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition:  'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
        }else {
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
      if (action === '1'){
        dataTwe.UnitContractGcode = this.params.id;
      }
      this.callApi.operationsCashFlow(dataTwe).subscribe((balanceSheet => {
        if (balanceSheet.state){
          this.ngGetCashFlow();
          this.snackBar.open(balanceSheet.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition:  'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
        }else {
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

  ngConvertDate(): void {
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
