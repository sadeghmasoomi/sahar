import { Injectable } from '@angular/core';
import {companies} from '../model/current-user/current-user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfirmCompanyService {
  dataCompany: any;
  constructor(private router: Router) { }

  confirmCompany(callback: any): any {
    return callback(JSON.parse(sessionStorage.getItem('menu') as string));
  }

  selectCompanyMenu(companyName: string, callback: any): any{
    this.dataCompany = JSON.parse(sessionStorage.getItem('companies') as any).companies;
    let data = {};
    for (let item of this.dataCompany) {
     if (item.firmName === companyName) {
       const dataLocal = {
         firmName: item.firmName,
         FirminfoGcode: item.FirminfoGcode,
         menu: item.menu,
       };
       sessionStorage.setItem('menu', JSON.stringify(dataLocal));
       data = {
         state: true,
         firmName: item.firmName,
         menu: item.menu
       };
       return callback(data);
     }
    }
    data = {
      state: false
    };
    return data;
  }

}
