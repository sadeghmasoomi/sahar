import { Component, OnInit } from '@angular/core';
import {CallDataService} from '../../../../services/jam/call-data.service';
import {ActivatedRoute} from '@angular/router';
import {Params} from '../../../../model/params/params';

@Component({
  selector: 'app-add-contracts',
  templateUrl: './add-contracts.component.html',
  styleUrls: ['./add-contracts.component.scss']
})
export class AddContractsComponent implements OnInit {
  description: any;
  formsData: any = {};
  formsDataTwe: any = {};
  balanceSheet: any;
  params: any;
  sums: any  = {};
  sums2: any  = {};
  newDate!: string;
  lastDate!: string;
  constructor(private callData: CallDataService, private route: ActivatedRoute, ) { }

  ngOnInit(): void  {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.getBalanceSheet();
      this.ngConvertDate();
    });
    this.getDescription();
  }

  getDescription(): void  {
    const data = {
      tableName: 'FSBalanceSheet'
    };
    this.callData.getJamDescription(data).subscribe((des: any) => {
      this.description = des.msg;
      this.catecholate();
    });
  }

  getBalanceSheet(): void  {
    this.formsData = {};
    this.formsDataTwe = {};
    const data = {
      Kind: 'Jam102',
      MasterCode: this.params.get('id'),
    };
    this.callData.getJam(data).subscribe((FirmContract: any) => {
      this.balanceSheet = FirmContract.msg;
      if (this.balanceSheet.length > 0) {
        for (const index in this.balanceSheet) {
          if (this.balanceSheet[index].TypeCode == 1) {
            this.formsData = this.balanceSheet[index];
          } else {
            this.formsDataTwe = this.balanceSheet[index];
          }
        }
      }
    });
  }

  catecholate(): void  {
    if (this.description) {
      for (let i in this.description) {
        for (let j in this.description[i].Titles) {
          for (let x in this.description[i].Titles[j].subTitle) {
            if (!this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName]) {
              this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName] = 0;
            }
            if (!this.formsData[this.description[i].Titles[j].subTitle[x].enName]) {
              this.formsData[this.description[i].Titles[j].subTitle[x].enName] = 0;
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
              let key = this.description[i].Titles[j].subTitle[x].enName;
              this.formsData[key] = 0;
              this.formsDataTwe[key] = 0;
              if (this.description[i].Titles[j].subTitle[x].type === 'Sum-Minus') {
                const values = this.description[i].Titles[j].subTitle[x].value;
                const operation = this.description[i].Titles[j].subTitle[x].operation;
                const le = values.length;
                for (let x = 0; x < le; x++) {
                  if (operation[x] && operation[x] === '-') {
                    this.formsData[key] -= Number(this.formsData[values[x]])
                    this.formsDataTwe[key] -= Number(this.formsDataTwe[values[x]]);
                  } else {
                    this.formsData[key] += Number(this.formsData[values[x]])
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

      for (let i = 0; i < this.description.length; i++) {
        this.sums[i] = 0;
        this.sums2[i] = 0;
        for (let j = 0; j < this.description[i].Titles.length; j++) {
          for (let x = 0; x < this.description[i].Titles[j].subTitle.length;x++) {
            if (this.description[i].Titles[j].subTitle[x].enName) {
              if (this.description[i].Titles[j].subTitle[x].disable && this.description[i].Titles[j].subTitle[x].type === 'Sum-Minus') {
                this.sums[i] += Number(this.formsData[this.description[i].Titles[j].subTitle[x].enName]) ;
                this.sums2[i] += Number(this.formsDataTwe[this.description[i].Titles[j].subTitle[x].enName]) ;
              }
            }
          }
        }
      }
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
