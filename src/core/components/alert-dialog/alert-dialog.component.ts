import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './alert-dialog.component.html',
  styleUrls:['./alert-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
   
  }
}
