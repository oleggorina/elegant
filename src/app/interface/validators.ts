import { AbstractControl, ValidatorFn } from "@angular/forms";

export function cardValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    const pattern = /^[0-9]+$/;
    return pattern.test(value) ? null : {'cardValue': {value: control.value}}
  }
}