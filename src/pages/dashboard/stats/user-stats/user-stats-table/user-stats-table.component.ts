import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { StatsService } from '../../stats.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { UserStatsResponse } from '../../models/user-stats-response.model';



@UntilDestroy({ checkProperties: true })
@Component({
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, MatTableModule, AsyncPipe],
  selector: 'app-user-stats-table',
  templateUrl: './user-stats-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStatsTableComponent implements OnInit {
  userStats$!: Observable<UserStatsResponse[]>;
  constructor(private statsService: StatsService, private cdr:ChangeDetectorRef) {}
  displayedColumns = ['id', 'name', 'session', 'login', 'logout', 'job','delete'];


  dataSource!: MatTableDataSource<UserStatsResponse>;
  ngOnInit() {
    this.userStats$ = this.statsService.userStats$;

    this.userStats$.subscribe((stats) => {
      this.dataSource = new MatTableDataSource(stats);
      this.cdr.detectChanges();
    });
  }

  onDelete(id: number) {
    if (confirm(`Delete Record ${id}?`)) {
      this.statsService.deleteUserStats(id).subscribe();
    }
  }
}
