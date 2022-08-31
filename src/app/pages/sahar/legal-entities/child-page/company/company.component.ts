import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {CallDataService} from '../../../../../services/sahar/call-data.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  formCompany: any;
  citeies: any[] = [];
  formData: any = {};
  provinces!: [];
  params: any;
  fullCard = false;
  constructor(private callData: CallDataService, private snackBar: MatSnackBar, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.ngGetFormCompany();
  }

  ngEditCompany(): void {
    this.formData.action = 2;
    this.callData.updateFormCompany(this.formData).subscribe((res) => {
      if (res.state) {
        this.snackBar.open(res.msg, 'x', {
          duration: 10000,
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

  ngGetFormCompany(): void {
    this.callData.getFormCompany().subscribe((res) => {
      this.formCompany = res.msg;
      this.route.paramMap.subscribe((params) => {
        this.fullCard = false;
        this.params = params.get('params');
        const data = {
          NationalId: this.params.get('id')
        };
        this.callData.getCompany(data).subscribe((company) => {
          this.formData = {};
          if (company.state) {
            this.formData = company.msg[0];
            this.fullCard = true;
            for (const sub of this.formCompany) {
              if (sub.enName === 'provinces') {
                this.provinces = sub.data.find((element: any) => element.name === company.msg[0].provinces).citeies;
                this.selectProvinces(this.provinces);
              }
            }
          }
        });
      });
    });
  }

  selectProvinces(value: any[]): void {
    this.citeies = value;
  }



}
