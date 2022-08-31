import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-firm-activition',
  templateUrl: './firm-activition.component.html',
  styleUrls: ['./firm-activition.component.scss']
})
export class FirmActivitionComponent {
  columnsToDisplay = [
    'row',
    'CoName',
    'TreatyDate',
    'TreatyNo',
    'FinalAmount',
    'DurationDateEnd',
    'StatusName',
    'FirmActivition',
  ];
  params: any;
  name!: any;
  company: any;
  companyData: any;
  constructor(private callData: CallDataService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.route.paramMap.subscribe((params) => {
      this.getContractActivation(params.get('nameSearch'));
      this.name = params.get('nameSearch');
    });
  }

  getContractActivation(textVal: any): void {
    if (textVal) {
      const data = {
        NationalId: textVal !== ' ' ? textVal : null,
        LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode

      };
      this.callData.getContractActivation(data).subscribe(res => {
        this.companyData = res.msg;
      });
    }
  }

  ngSearch(name: string): void {
    this.router.navigate(['Sahar/FirmActivition', name]);
  }

  firmActivitionSet(event: any, item: any): void {
    const data = {
      FirmContractGcode: item.GCode,
      LoactionGcode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
      Active: event ? 1 : 0,
      Action: 2,
    };
    this.callData.firmContractActivation(data).subscribe(res => {
      this.snackBar.open(res.msg, 'x', {
        duration: 15000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-success'
      });
    });
  }
}
