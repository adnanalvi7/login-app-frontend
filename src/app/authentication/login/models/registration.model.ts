import { FormControl, Validators } from '@angular/forms';


export class Login {

  /**
   * Constructor
   *
   * @param rec
   */
  constructor() {

  }


  public validationRules(): any {
    return {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
    };
  }


}

