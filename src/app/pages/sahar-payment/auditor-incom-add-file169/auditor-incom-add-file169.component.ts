import {Component, Inject, OnInit} from '@angular/core';
import {CallDataService} from '../../../services/sahar/call-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-auditor-incom-add-file169',
  templateUrl: './auditor-incom-add-file169.component.html',
  styleUrls: ['./auditor-incom-add-file169.component.scss']
})
export class AuditorIncomAddFile169Component implements OnInit {

  constructor(private callData: CallDataService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar, public dialogRef: MatDialogRef<AuditorIncomAddFile169Component>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
