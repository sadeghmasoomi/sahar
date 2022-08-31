import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CallDataService} from '../../../../../services/sahar/call-data.service';


@Component({
  selector: 'app-acsept',
  templateUrl: './acsept.component.html',
  styleUrls: ['./acsept.component.scss']
})
export class AcceptComponent {
  comment!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public dataAccept: any,
              public dialogRef: MatDialogRef<AcceptComponent>,
              private callData: CallDataService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
