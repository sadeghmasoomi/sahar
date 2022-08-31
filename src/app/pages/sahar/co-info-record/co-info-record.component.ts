import { Component } from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-co-info-record',
  templateUrl: './co-info-record.component.html',
  styleUrls: ['./co-info-record.component.scss']
})
export class CoInfoRecordComponent {
  name!: string;
  dataValues: any;
  columnsToDisplay = [
    'name',
    'NationalID',
    'FoundationDate',
    'StatusDsc',
    'operation'
  ];

  constructor(private callData: CallDataService, private snackBar: MatSnackBar) { }

  getCompanyFromApi(value: string): void {
    const data: any = {
      NationalID: value
    };
    this.callData.getCompanyDataFromApi(data).subscribe( (res) => {
      if (typeof ([res.msg][0].name) === 'string'){
        this.dataValues = [res.msg];
      } else {
        this.snackBar.open('اختلال در استعلام ثبت شرکت ها', 'x', {
          duration: 10000,
          direction: 'rtl',
          verticalPosition: 'top',
          horizontalPosition: 'start',
          panelClass: 'panel-error'
        });
      }
    });
  }

  getCompanyDataFromApi(value: string): void {
    if (confirm('ثبت نام شرکت در سامانه جامع تجارت انجام شود ؟')) {
      const data: any = {
        NationalID: value
      };
      this.callData.getCompanyFromApi(data).subscribe( (res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.dataValues = null;
          this.name = '';
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
}
