import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/pages/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TopNavComponent {
  constructor(private authService: AuthService, private router: Router) {}

 // isUser: boolean;
 isUser$!:Observable<boolean>;

  ngOnInit(): void {
   // this.authService.isUser$.subscribe((u) => (this.isUser = u));
    this.isUser$ = this.authService.isUser$;
  }



  onLogout() {
    this.authService.logout().subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }
}
