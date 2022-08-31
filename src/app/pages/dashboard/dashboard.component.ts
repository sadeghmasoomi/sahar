import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ConfirmCompanyService} from '../../services/confirm-company.service';
import {companies, Field} from '../../model/current-user/current-user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: Field = JSON.parse(sessionStorage.getItem('currentUser') as string);
  menuItem: any;
  getCompanies!: any;
  companyNameShow!: string;
  selectedCompany!: string;
  baseFile: any;

  constructor(private menuService: ConfirmCompanyService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const vm = this;
    if (this.user && this.user.token) {
      if (sessionStorage.getItem('menu') as string) {
        this.selectedCompany = JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode;
      }
      this.getCompanies =  JSON.parse(sessionStorage.getItem('companies') as string).companies;
      this.menuService.confirmCompany( (menuItems: any) => {
        if (menuItems) {
          vm.menuItem = menuItems.menu;
          vm.companyNameShow = menuItems.firmName;
        }
      });
    }
  }

  selectCompany({companyName}: { companyName: any }): void {
    const vm = this;
    this.menuService.selectCompanyMenu(companyName, (res: any) => {
      if (res.state) {
          vm.menuItem = res.menu;
          vm.companyNameShow = res.firmName;
          location.reload();
      } else {
        this.snackBar.open('شرکت ساخته درست انتخاب نشده است.', 'x', {
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
