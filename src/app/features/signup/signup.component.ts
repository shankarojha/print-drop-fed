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
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, CommonModule, MatRadioModule],
  providers: [UserService, StateService],
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

  signupResponse!: Subscription;
  constructor(private userService: UserService, private stateService : StateService) { }

  onSignupSubmit() {
    console.log(this.signUpForm.value)
    if (this.signUpForm.valid) {
      this.userService.signup(this.signUpForm.value).subscribe({
        next: (response) => {
          return this.signupResponse = response
        },
        error: (error) => console.error(error),
        complete: () => console.log("complete")
      })
    }
  }


  clickHideEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }



  ngOnDestroy(): void {
    if (this.signupResponse) {
      this.signupResponse.unsubscribe();
    }
  }

}
