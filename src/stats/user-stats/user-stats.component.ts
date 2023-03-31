import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StatsService } from '../stats.service';
import { UserStatsTableComponent } from './user-stats-table/user-stats-table.component';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FormsModule, UserStatsTableComponent],
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStatsComponent {
  constructor(private statsService: StatsService, private cdr:ChangeDetectorRef) {}
  loginName = 'gabi';

  @ViewChild('f') f:NgForm;

  onGetAll(){
    this.statsService.getAllUserStats().subscribe(()=>this.cdr.detectChanges());
  }

  onSearch(userName: string) {
    this.f.reset();
    this.statsService.getUserStatsByName(userName).subscribe(()=>this.cdr.detectChanges());
  }

  onGetSessionsLowerThanFiveMinutes(){
    this.statsService.getSessionsLowerThanFive().subscribe(()=>this.cdr.detectChanges());
  }
}
