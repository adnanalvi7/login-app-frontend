import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Login } from './models/registration.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public fg: FormGroup;
  // Login model instance.
  public login: Login;
  returnUrl: string;

  constructor(
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private router: Router,
  ) { 
    
  }
  // convenience getter for easy access to form fields
  get f(): any { return this.fg.controls; }

  ngOnInit(): void {
        // redirect to home if already logged in
        if (this._authenticationService.loginUserValue) {
          this.returnUrl = "/dashboard";
          this.router.navigate([this.returnUrl]);
      }
        this._initPage()
  }
  /**
     * Initialize page regarding Create, Update or view functionality as per provided action.
     * 
     */
   private _initPage(): void {
    this.login = new Login();
    this.fg = this._fb.group(this.login.validationRules());

  }
   onSubmit(): void {
      // stop here if form is invalid
      if (this.fg.invalid) {
          return;
      }

    this._authenticationService.login(this.f.email.value,this.f.password.value)
        .subscribe((user: any) => {
           if(user.is_success){
            this._authenticationService.successMessage("Login Successfully", 'Success');
            this.router.navigate(["/dashboard"]);
           }
        }, (error:HttpErrorResponse) => {
            this._authenticationService.errorMessage(error.error.message, 'Error');

        });
    }
}
