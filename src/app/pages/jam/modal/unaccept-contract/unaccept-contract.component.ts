import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CallDataService} from "../../../../services/jam/call-data.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-unaccept-contract',
  templateUrl: './unaccept-contract.component.html',
  styleUrls: ['./unaccept-contract.component.scss']
})
export class UnAcceptContractComponent {
  addFormShareHolder!: FormGroup;
  submitted = false;
  params!: object;
  numberLen: any;
  comment!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public acceptData: any,
              public dialogRef: MatDialogRef<UnAcceptContractComponent>,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private callData: CallDataService) { }

  ngChangeStatus(comment: string): void {
    if (confirm('مایل به عدم تایید صورت های مالی هستید ؟')) {
      const data = {
        UnitContractGcode: this.acceptData.GCode,
        FirmInfoGCode: JSON.parse(sessionStorage.getItem('menu') as string).FirminfoGcode,
        Comment: comment,
        action: '41',
      };
      this.callData.confirmContract(data)
        .pipe(first())
        .subscribe(flow => {
          if (flow.state) {
            this.snackBar.open(flow.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-success'
            });
            this.onNoClick();
          } else {
            this.snackBar.open(flow.msg, 'x', {
              duration: 10000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'start',
              panelClass: 'panel-error'
            });
          }
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
