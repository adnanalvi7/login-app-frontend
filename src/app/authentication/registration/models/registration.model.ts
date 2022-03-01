import { FormControl, Validators } from '@angular/forms';


export class Registration {

  /**
   * Constructor
   *
   * @param rec
   */
  constructor() {

  }


  public validationRules(): any {
    return {
      username: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    };
  }


}

