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
  userName!:string;

  ngOnInit(): void {

    this.authService.isUser$.subscribe((user) => {
      this.userName = this.authService.getLoginData().userName;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }
}
