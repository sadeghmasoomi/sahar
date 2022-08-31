import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JamComponent } from './jam.component';
import {JamFsFlowListsComponent} from './jam-fs-flow-lists/jam-fs-flow-lists.component';
import {JamFsFlowControlComponent} from './jam-fs-flow-control/jam-fs-flow-control.component';
import {AddContractsComponent} from './child-page/add-contracts/add-contracts.component';
import {CostAndBenefitComponent} from './child-page/cost-and-benefit/cost-and-benefit.component';
import {CashFlowComponent} from './child-page/cash-flow/cash-flow.component';
import {RestInformationComponent} from './child-page/rest-information/rest-information.component';
import {ShareholdersComponent} from './child-page/shareholders/shareholders.component';
import {TransAffiliatesComponent} from './child-page/trans-affiliates/trans-affiliates.component';
import {MemberRelationComponent} from './child-page/member-relation/member-relation.component';
import {JamFsFlowHistoryComponent} from './jam-fs-flow-history/jam-fs-flow-history.component';
import {JamFsFlowControledComponent} from './jam-fs-flow-controled/jam-fs-flow-controled.component';

const routes: Routes = [
  { path: '', component: JamComponent},
  { path: '', component: JamComponent, children: [
      {path: 'JamFsFlow', component: JamFsFlowListsComponent,  data: {title: 'گزارشات'}},
      {path: 'JamFsFlow', component: JamFsFlowListsComponent,  data: {title: 'گزارشات'}},
      {path: 'JamFsFlow/:pageNumber', component: JamFsFlowListsComponent,  data: {title: 'گزارشات'}},
      {path: 'JamFsFlow/:pageNumber/:nameSearch', component: JamFsFlowListsComponent,  data: {title: 'گزارشات'}},
      {path: 'JamFsFlowControl/:active/:idNumber', component: JamFsFlowControlComponent,  data: {title: 'کنترول صورت های مالی'},
          children: [
              {path: 'add-contracts/:date/:id', component: AddContractsComponent, data: {title: 'قرارداد ها '}},
              {path: 'cost-and-benefit/:date/:id', component: CostAndBenefitComponent, data: {title: 'صود و زیان'}},
              {path: 'cash-flow/:date/:id', component: CashFlowComponent, data: {title: 'صورت جریان موجود نقد'}},
              {path: 'rest-information/:date/:id', component: RestInformationComponent, data: {title: 'سایر اطلاعات'}},
              {path: 'shareholders/:id', component: ShareholdersComponent, data: {title: 'سهامداران'}},
              {path: 'transAffiliates/:id', component: TransAffiliatesComponent, data: {title: 'اشخاص وابسته'}},
              {path: 'memberRelation/:id', component: MemberRelationComponent, data: {title: 'مدیران'}},
        ]},
          { path: 'JamFsFlowHistory', component: JamFsFlowHistoryComponent },
          { path: 'JamFsFlowHistory/:pageNumber', component: JamFsFlowHistoryComponent },
          { path: 'JamFsFlowHistory/:pageNumber/:nameSearch', component: JamFsFlowHistoryComponent },
          { path: 'JamFsFlowControled', component: JamFsFlowControledComponent },
          { path: 'JamFsFlowControled/:pageNumber', component: JamFsFlowControledComponent },
          { path: 'JamFsFlowControled/:pageNumber/:nameSearch', component: JamFsFlowControledComponent },

    ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JamRoutingModule { }
export const RouteComponentJamPath = [
    JamFsFlowControlComponent,
    AddContractsComponent,
    CashFlowComponent,
    CostAndBenefitComponent,
    MemberRelationComponent,
    RestInformationComponent,
    ShareholdersComponent,
    TransAffiliatesComponent,
    JamFsFlowListsComponent,
    JamFsFlowControledComponent,
    JamFsFlowHistoryComponent
];
