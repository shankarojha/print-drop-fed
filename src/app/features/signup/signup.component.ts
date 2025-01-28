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
  selector: 'app-signup',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, CommonModule, MatRadioModule],
  providers: [UserService, StateService, SnackbarService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnDestroy {

  /** defining reactive signup forms */
  hidePassword = signal(true);

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    pinCode: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    country: new FormControl("India", Validators.required),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    userType: new FormControl('printee', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
  })
  /**Ends */
  private subscriptions: Subscription = new Subscription()
  constructor(private userService: UserService, private stateService: StateService, private snackbarService: SnackbarService, private router: Router) { }

  onSignupSubmit() {
    console.log(this.signUpForm.value)
    if (this.signUpForm.valid) {
      this.stateService.updateIsLoading(true);
      const signupSub = this.userService.signup(this.signUpForm.value).subscribe({
        next: (response) => {
          if (response?.status === 201) {
            this.snackbarService.success("Signup Successful");
            this.stateService.updateIsLoading(false);
            this.router.navigate(['/login'])
          }
        },
        error: (error) => { 
          this.stateService.updateIsLoading(false);
          if(error?.error?.error?.code === 11000){
            this.snackbarService.error("User already exists") 
          }
        },
      })

      this.subscriptions.add(signupSub)
    }

  }


  clickHideEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }



  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
