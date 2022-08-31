import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {GovAuditRoutingModule, RouteGovAuditComponentPath} from './gov-audit-routing.module';
import { GovAuditComponent } from './gov-audit.component';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {EducationModule} from '../education/education.module';



@NgModule({
  declarations: [
    GovAuditComponent,
    RouteGovAuditComponentPath,
  ],
    imports: [
        CommonModule,
        FormsModule,
        GovAuditRoutingModule,
        DpDatePickerModule,
        MatCardModule,
        MatTableModule,
        MatSelectModule,
        FlexModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        EducationModule,
        FlexLayoutModule
    ]
})
export class GovAuditModule { }
