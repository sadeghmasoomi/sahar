import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-legal-entities',
  templateUrl: './legal-entities.component.html',
  styleUrls: ['./legal-entities.component.scss']
})
export class LegalEntitiesComponent{
  addFormLegal: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute ) {
    this.addFormLegal = formBuilder.group({
      NationalId: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }


  get f(): any { return this.addFormLegal.controls; }

  ngSearchCompany(): void {
    this.submitted = true;
    if (!this.addFormLegal.valid) {
      this.snackBar.open('آیدی شرکت به درستی وارد نشده است', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
    } else {
      this.router.navigate(['Sahar/Legalentitiesandindividuals/company', this.f.NationalId.value]);
    }
  }

}
