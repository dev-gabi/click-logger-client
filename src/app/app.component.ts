import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from 'src/pages/auth/auth.service';


@UntilDestroy({ checkProperties: true })
@Component({
  standalone: true,
  imports: [RouterModule, NgIf],
  selector: 'app-component',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  isUser: boolean;

  ngOnInit(): void {
    this.authService.isUser$.subscribe((u) => (this.isUser = u));
  }

  onLogout() {
    this.authService.logout().subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }
}
