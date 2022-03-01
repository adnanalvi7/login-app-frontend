import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Registration } from './models/registration.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public fg: FormGroup;
  // Registration model instance.
  public register: Registration;
  returnUrl: string;

  constructor(
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private router: Router,
  ) { }
  // convenience getter for easy access to form fields
  get f(): any { return this.fg.controls; }

  ngOnInit(): void {
     // redirect to home if already logged in
     this.returnUrl =  "/auth/login";
     if (this._authenticationService.loginUserValue) {
      this.router.navigate(["/"]);
  }
    this._initPage()
  }
    /**
     * Initialize page regarding Create, Update or view functionality as per provided action.
     * 
     */
    private _initPage(): void {
      this.register = new Registration();
      this.fg = this._fb.group(this.register.validationRules());

    }
    onSubmit(): void {
      // stop here if form is invalid
      if (this.fg.invalid) {
          return;
      }

      const payload = {

        email: this.f.email.value,
        username: this.f.username.value,
        phone: this.f.phone.value,
        password: this.f.password.value,
        status: false

    };

    this._authenticationService.signup(payload)
        .subscribe((user: any) => {
           if(user.is_success){
            this._authenticationService.successMessage('Please Check Your Email to verify Account ', 'Info');
            this.router.navigate([this.returnUrl]);

           }
        }, (error:HttpErrorResponse)  => {
            this._authenticationService.errorMessage(error.error.message, 'Error');

        });
    }
}
