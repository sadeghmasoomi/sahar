import {Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {Field} from '../../model/current-user/current-user';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() IdMenu: any;
  user: Field = JSON.parse(sessionStorage.getItem('currentUser') as string);

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private authenticationService: AuthenticationService,
              private router: Router) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/alarm.svg'));
  }

  logout(): void {
    this.authenticationService.logout();
    location.reload();
  }

}
