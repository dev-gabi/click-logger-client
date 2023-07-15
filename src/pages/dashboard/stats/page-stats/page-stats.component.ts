import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { PageStatsResponse } from '../models/page-stats-response.model';
import { StatsService } from '../stats.service';

@UntilDestroy({ checkProperties: true })
@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule],
  selector: 'app-page-stats',
  templateUrl: './page-stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageStatsComponent implements OnInit {
  constructor(private statsService: StatsService) {}

  stats$!: Observable<PageStatsResponse[]>;
  displayedColumns = ['id', 'name', 'button', 'time', 'delete'];
  dataSource!: MatTableDataSource<PageStatsResponse>;

  ngOnInit() {
    //todo: state managment - each page route send a new get request
    this.statsService.getPageStats().subscribe();
    this.stats$ = this.statsService.pageStats$;

    this.stats$.subscribe((stats) => {
      this.dataSource = new MatTableDataSource(stats);
    });
  }

  onDelete(id: number) {
    if (confirm(`Delete Record ${id}?`))
      this.statsService.deletePageStats(id).subscribe();
  }
}
