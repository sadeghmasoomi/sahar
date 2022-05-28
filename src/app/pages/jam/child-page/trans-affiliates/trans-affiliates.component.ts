import { Component } from '@angular/core';
import {TransAffiliates} from '../../../../model/TransAffiliates/trans-affiliates';
import {CallDataService} from '../../../../services/jam/call-data.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-trans-affiliates',
  templateUrl: './trans-affiliates.component.html',
  styleUrls: ['./trans-affiliates.component.scss']
})
export class TransAffiliatesComponent {
  params: any;
  transAffiliates: any;
  displayedColumns: string[] = [
    'RelatedGroup',
    'FirmType',
    'NationalId',
    'RelationShipType',
    'BusinessLaw129',
    'PurchaseofGoodsAndServices',
    'SalesofGoodsAndServices',
    'LoansReceived',
    'LoansPaid',
    'OtherPurchas',
    'OtherSales',
    'CollateralGrantedAndReceived',
  ];
  constructor(private callData: CallDataService, private route: ActivatedRoute,  private snackBar: MatSnackBar) {
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      this.ngTransAffiliates();
    });
  }

  ngTransAffiliates(): void{
    const data = {
      Kind: 'Jam107',
      MasterCode: this.params.get('id'),
    };
    this.callData.getJam(data).subscribe((shareholders => {
      this.transAffiliates = shareholders.msg;
    }));
  }
}
