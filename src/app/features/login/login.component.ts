import { Component, ChangeDetectionStrategy, signal, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { Subscription } from 'rxjs';
import { StateService } from '../../core/services/state.service';
import { MatRadioModule } from '@angular/material/radio';
import { SnackbarService } from '../../core/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, CommonModule, MatRadioModule],
  providers: [UserService, StateService, SnackbarService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hidePassword = signal(true);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  private subscriptions: Subscription = new Subscription()

  constructor(private userService: UserService, private stateService: StateService, private snackbarService: SnackbarService, private router: Router) { }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.stateService.updateIsLoading(true)
      const loginSub = this.userService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response)
          if(response.status === 200){
            this.snackbarService.success("Logged in successfully")
            this.stateService.updateIsLoading(false);
            response?.data?.token && localStorage.setItem('authToken', response?.data?.token);
            response?.data?.token && localStorage.setItem('user', JSON.stringify(response?.data?.user));
            response?.data?.user?.userType && this.router.navigate([`/${ response?.data?.user?.userType}-landing`]);
          }
        },
        error: (error) => {
          console.log(error)
          this.snackbarService.error("Some error occurred")
          this.loginForm.get('password')?.reset();
          this.stateService.updateIsLoading(false);
        }
      })

      this.subscriptions.add(loginSub)
    }
  }

  clickHideEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
