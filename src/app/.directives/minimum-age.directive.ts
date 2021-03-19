import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Directive, OnInit, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appMinimumAge]',
  providers: [
    {
      provide: NG_VALIDATORS, 
      useExisting: MinimumAgeDirective, 
      multi: true
    }
  ]
})

export class MinimumAgeDirective implements Validator {
 
  ngOnInit(){}

  validate(c: FormControl) {
    var dateOfBirth: any = c.value;
    if(dateOfBirth !=null){

      var yearOfBirth: any = dateOfBirth.substr(0,4);
      var monthOfBirth: any = dateOfBirth.substring(5,7);
      var dayOfBirth: any = dateOfBirth.substring(8);

      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var currentMonth = currentDate.getMonth()+1;
      var currentDay = currentDate.getDate();

      var age = currentYear - yearOfBirth;

      if(age == 18){
       if(currentMonth < monthOfBirth){
         age--;
       }else if(currentMonth == monthOfBirth){
          if(currentDay < dayOfBirth){
            age--;
        }
       }
      }
   
      if (age < 18) {
        return { 'age': true, 'requiredValue': 18 }
      }
    }
    return null;
  }

}
