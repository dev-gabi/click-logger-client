import { DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Buttons } from './buttons.enum';
import { LoginRequest } from './models/login-request.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TimerComponent } from './timer/timer.component';
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, TimerComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  loginForm!: FormGroup;
  startTimeOnPage!: number;

  ngOnInit(): void {
    this.startTimeOnPage = performance.now();
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  onLogin() {
    this.loginForm.reset();
    const req: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      timeOnPageInSeconds: this.getTimeInSecondsOnPage()
    };
    this.authService.login(req).subscribe((res) => {
     // console.log(res);
      if (res.userName) {
        this.router.navigate(['/dash']);
      }
    });
  }

  getTimeInSecondsOnPage(): number {
    const millis = performance.now() - this.startTimeOnPage;
    var seconds = Math.floor(millis / 1000);

    return seconds;
  }
}
