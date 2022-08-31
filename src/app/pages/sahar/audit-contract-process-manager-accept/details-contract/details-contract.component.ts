import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-details-contract',
  templateUrl: './details-contract.component.html',
  styleUrls: ['./details-contract.component.scss']
})
export class DetailsContractComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
