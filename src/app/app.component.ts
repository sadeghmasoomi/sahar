import {Component, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatSidenav} from '@angular/material/sidenav';
import {NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmCompanyService} from './services/confirm-company.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  opened = true;
  mode = new FormControl('side');
  @ViewChild('drawer', {static: true}) drawer!: MatSidenav;
  watcher!: Subscription;
  currentUser: any;
  user: any;
  menuItem: any;
  activeMediaQuery: any;
  getCompanies: any;
  companyNameShow!: string;
  activeInfoPag = false;

  constructor(media: MediaObserver,
              private router: Router,
              private authenticationService: AuthenticationService,
              public dialog: MatDialog,
              private menuService: ConfirmCompanyService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (window.location.href.split('/')[4] === 'info'
          || window.location.href.split('/')[4] === 'contact'
          || window.location.href.split('/')[4] === 'about-us') {
          this.activeInfoPag = true;
        } else {
          this.activeInfoPag = false;
        }
      }
    });
    this.watcher = media.asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      ).subscribe((change: MediaChange) => {
        this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
        if ( change.mqAlias === 'sm' || change.mqAlias === 'xs' || change.mqAlias === 'md' ) {
          this.opened = false;
          this.mode = new FormControl('over');
        } else {
          this.opened = true;
          this.mode = new FormControl('side');
        }
      });
    if (sessionStorage.getItem('currentUser') as string) {
      this.user = JSON.parse(sessionStorage.getItem('currentUser') as string);
    }
    if (JSON.parse(sessionStorage.getItem('companies') as string)) {
      this.checkCompanyData();
      this.getCompanies = JSON.parse(sessionStorage.getItem('companies') as string).companies;
    }
    this.authenticationService.currentUser.subscribe((x: any) => this.currentUser = x);
    const vm = this;
    if (this.user && this.user.token) {
      this.menuService.confirmCompany( (res: any) => {
        if (res) {
          vm.menuItem = res.menu;
          vm.companyNameShow = res.firmName;
        } else {
          vm.companyNameShow = 'انتخاب شرکت';
          vm.menuItem = [
            {displayName: 'داشبورد', iconName: 'dashboard', route: '', order: 1}
          ];
        }
      });
    }
  }

  chooseCompanySelect(companyName: any): void {
    const vm = this;
    this.menuService.selectCompanyMenu(companyName, (res: any) => {
      vm.menuItem = res.menu;
      vm.companyNameShow = res.firmName;
      vm.router.navigate(['/']);
    });
  }

  checkCompanyData(): void {
    const companiesSession = JSON.parse(sessionStorage.getItem('companies') as string);
    for (const item of  companiesSession.companies) {
      if (!item) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
        break;
      }
    }
  }



}
