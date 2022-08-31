import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-info-site',
  templateUrl: './info-site.component.html',
  styleUrls: ['./info-site.component.scss']
})
export class InfoSiteComponent {

  constructor(private dialog: MatDialog) { }
}
