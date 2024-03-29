import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginRequest } from './models/login-request.model';
import { AuthService } from './auth.service';
import { TimerComponent } from './timer/timer.component';
import { environment } from 'src/environments/environment';
import { AlertDialogComponent } from 'src/core/components/alert-dialog/alert-dialog.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, TimerComponent, AlertDialogComponent, MatDialogModule, MatIconModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public errorDialog:MatDialog
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
    this.loginForm.setValue({
      email:environment.email,
      password:environment.password
    })
  }
  onLogin() {
    const req: LoginRequest = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
      timeOnPageInSeconds: this.getTimeInSecondsOnPage()
    };
   
    this.authService.login(req).subscribe(
      {
      next: (res) => {      
                  if (res.userName) {
                    this.loginForm.reset();
                    this.router.navigate(['/dash']);
                  }},
      error: (e) => this.openErrorDialog(e),

      }
  );}

  getTimeInSecondsOnPage(): number {
    const millis = performance.now() - this.startTimeOnPage;
    var seconds = Math.floor(millis / 1000);

    return seconds;
  }

  openErrorDialog(error:string){
    this.errorDialog.open(AlertDialogComponent, {
      data:error
  });
   
  }
}
