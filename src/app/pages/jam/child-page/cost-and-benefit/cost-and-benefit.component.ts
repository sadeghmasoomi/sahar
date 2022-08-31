import { Component } from '@angular/core';
import {CallDataService} from '../../../../services/jam/call-data.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cost-and-benefit',
  templateUrl: './cost-and-benefit.component.html',
  styleUrls: ['./cost-and-benefit.component.scss']
})
export class CostAndBenefitComponent {
  dataCostAndBenefit: any;
  params: any;
  formsData: any = {};
  formsDataTwe: any = {};
  someOne: any;
  someTwe: any;
  sums: object = {};
  sums2: object = {};
  edit = false;
  description: any;
  newDate!: string;
  lastDate!: string;
  constructor(private callApi: CallDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.ngGetCostAndBenefit();
      this.ngConvertDate();
    });
    this.getDescription();
  }

  ngGetCostAndBenefit(): void {
    const data = {
      Kind: 'Jam103',
      MasterCode: this.params.get('id')
    };
    this.edit = false;
    this.formsData = {};
    this.formsDataTwe = {};
    this.callApi.getJam(data).subscribe((CostAndBenefit => {
      this.dataCostAndBenefit = CostAndBenefit.msg;
      if (this.dataCostAndBenefit){
        if (this.dataCostAndBenefit.length > 0) {
          this.edit = true;
          for (const index in this.dataCostAndBenefit) {
            if (this.dataCostAndBenefit[index].TypeCode == 1) {
              this.formsData = this.dataCostAndBenefit[index];
              this.catecolate();
            } else {
              this.formsDataTwe = this.dataCostAndBenefit[index];
              this.catecolate();

            }
          }
        }
      }
    }));
  }

  getDescription(): void {
    this.edit = false;
    const dataVal = {
      tableName: 'FSProfitandLossStatement'
    };
    this.callApi.getJamDescription(dataVal).subscribe((des => {
      this.description = des.msg;
      this.catecolate();
    }));

  }

  catecolate(): void {
    if (this.description){
      for (const i in this.description) {
        for (const j in this.description[i].Titles) {
          for (const x in this.description[i].Titles[j].subTitle) {
            if (!this.formsData[this.description[i].Titles[j].subTitle[x].enName]){
              this.formsData[this.description[i].Titles[j].subTitle[x].enName] = 0;
              this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName] = 0;
            }

            if (!this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName]){
              this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName] = 0;
            }
            if (!this.description[i].Titles[j].subTitle[x].enName) {
              this.formsData[this.description[i].Titles[j].subTitle[x].enName] = 0;
              this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName] = 0;
            }
            if (this.description[i].Titles[j].subTitle[x].disable) {
              const key = this.description[i].Titles[j].subTitle[x].enName;
              this.formsData[key] = 0;
              this.formsDataTwe[key] = 0;
              if (this.description[i].Titles[j].subTitle[x].type == 'Sum-Minus') {
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

  sendCostAndBenefit(dataVal: any, dataTwe: any, action: string): void {
    const insert = dataVal;
    if (Object.keys(insert).length > 0) {
      insert.action = action;
      if (action == '1') {
        insert.TypeCode = '1';
        insert.UnitContractGcode = this.params.id;
      }
      this.callApi.operationsProfitandLossStatement(insert).subscribe((balanceSheet => {
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

      this.callApi.operationsProfitandLossStatement(dataTwe).subscribe((balanceSheet => {
        if (balanceSheet.state) {
          this.ngGetCostAndBenefit();
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
