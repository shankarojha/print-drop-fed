import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {

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
    userType: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
  })

  onSignupSubmit(){
    console.log(this.signUpForm.value)
  }

  
  clickHideEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  /**Ends */

}
