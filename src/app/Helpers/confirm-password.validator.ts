import { FormGroup } from "@angular/forms";

export function confirmPasswordValidator(controlName: string,matchControlName:string)
{
 return(formGroup: FormGroup) =>{
    const passowrdControl = formGroup.controls[controlName];
    const confirmPasswordControl= formGroup.controls[matchControlName];
    if(confirmPasswordControl.errors && confirmPasswordControl.errors['confirmPasswordValidators '])
    {
        return;
    }

    if(passowrdControl.value !== confirmPasswordControl.value)
    {
        confirmPasswordControl.setErrors({confirmPasswordValidator :true    })

    }
    else {
        confirmPasswordControl.setErrors(null)
    }
 }
}