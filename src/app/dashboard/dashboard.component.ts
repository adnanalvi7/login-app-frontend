import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _authenticationService: AuthenticationService,

  ) { }

  ngOnInit(): void {
  }
  onSubmit(){
this._authenticationService.logout()
  }
}
