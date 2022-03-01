import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  token: string;

  constructor(
    private route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
    private router: Router,

  ) { 
    this.token = this.route.snapshot.paramMap.get('token') as any;

  }

  ngOnInit(): void {
    this._authenticationService.activateAccount({token: this.token}).subscribe((res: any) => {
      if(res.is_success){
        this._authenticationService.successMessage("Thankyou For Verifying Account", "Success")
       this.router.navigate(["/auth/login"]);
      }
   }, error => {
       this._authenticationService.errorMessage(error?.error?.message, 'Error');

   });
  }

}
