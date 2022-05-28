import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouteComponentUserManagment, UserManagmentRoutingModule} from './user-managment-routing.module';
import { UserManagmentComponent } from './user-managment.component';
import { UserCreateComponent } from './user-create/user-create.component';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {EducationModule} from '../education/education.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserCreateOperationComponent } from './user-create/user-create-operation/user-create-operation.component';
import {MatInputModule} from '@angular/material/input';
import {NgxCurrencyModule} from 'ngx-currency';
import {MatSelectModule} from '@angular/material/select';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {MatTableModule} from '@angular/material/table';
import { UserFlowComponent } from './user-create/user-flow/user-flow.component';
import { LoginUserComponent } from './user-create/login-user/login-user.component';

export const customCurrencyMaskConfig = {
  align: 'center',
  allowNegative: true,
  allowZero: false,
  decimal: ',',
  precision: 0,
  prefix: '',
  suffix: '',
  thousands: ',',
  nullable: true
};
@NgModule({
  declarations: [
    UserManagmentComponent,
    RouteComponentUserManagment,
    UserCreateComponent,
    UserCreateOperationComponent,
    UserFlowComponent,
    LoginUserComponent,
  ],
  imports: [
    CommonModule,
    UserManagmentRoutingModule,
    FormsModule,
    MatIconModule,
    FlexModule,
    MatButtonModule,
    MatExpansionModule,
    EducationModule,
    MatPaginatorModule,
    MatInputModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    MatSelectModule,
    DpDatePickerModule,
    FlexLayoutModule,
    MatTableModule
  ]
})
export class UserManagmentModule { }
