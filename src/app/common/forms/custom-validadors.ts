import { FormControl, AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {

  public static noWhiteSpaceValidator(control: AbstractControl): { [s: string]: boolean } {
    const re = /^\s+$/;

    if (typeof control.value === 'string' && control.value && control.value.match(re)) {
      return { noSpace: true };
    }
  }

  public static emailValidator(control: AbstractControl): { [s: string]: boolean } {
    const re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;

    if (typeof control.value === 'string' && control.value && !control.value.match(re)) {
      return { email: true };
    }
  }

  public static invalidDateValidator(control: AbstractControl): { [s: string]: boolean } {
    const re = '1900-01-01';
    const reMax = '2099-31-12';
    let valueToCompare = control.value;

    if (control.value && control.value.length === 10 && control.value.split('/').length === 3) {
      valueToCompare = control.value.split('/').reverse().join('-');
    }

    if (typeof control.value === 'string' && control.value && (valueToCompare < re || valueToCompare > reMax)) {
      return { dateInvalid: true };
    }
  }

  static validateFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty();
      } else if (control instanceof FormGroup) {
        this.validateFields(control);
      }
    });
  }
}
