import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { StatsService } from '../stats.service';
import { UserStatsResponse } from '../models/user-stats-response.model';
import { UserStatsTableComponent } from './user-stats-table/user-stats-table.component';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FormsModule, UserStatsTableComponent],
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStatsComponent {
  constructor(private statsService: StatsService) {}
  loginName = 'gabi';
  onSearch(userName: string) {
    this.statsService.getUserStatsByName(userName).subscribe();
  }
}
