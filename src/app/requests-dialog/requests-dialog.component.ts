import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-requests-dialog',
  templateUrl: './requests-dialog.component.html',
  styleUrls: ['./requests-dialog.component.css']
})
export class RequestsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }
}
