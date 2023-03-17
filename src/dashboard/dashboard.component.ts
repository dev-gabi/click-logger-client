import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from '../auth/auth.service';

@UntilDestroy({ checkProperties: true })
@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  isUser!: boolean;

  ngOnInit(): void {
    //todo: check local storage for userName and display in template
    this.authService.isUser$.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }
}
