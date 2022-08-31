import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {JamRoutingModule, RouteComponentJamPath} from './jam-routing.module';
import { JamComponent } from './jam.component';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {UnAcceptContractComponent} from './modal/unaccept-contract/unaccept-contract.component';
import {EducationModule} from '../education/education.module';


@NgModule({
  declarations: [JamComponent, RouteComponentJamPath, UnAcceptContractComponent],
  imports: [
    JamRoutingModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    EducationModule,
    CommonModule
  ]
})
export class JamModule { }
