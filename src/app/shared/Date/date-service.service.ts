import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  constructor() { }

  onAlphaOnly(event: any) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^A-Za-z]/g, '');
  
}

 onAlphaOnlyEM(event: any) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^A-Za-z.@]/g, '');
  
}

onAlphaOnlysp(event: any) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^A-Za-z ]/g, '');
  
}

onNumericOnly(event: any) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^0-9]/g, '');
  
}

onAlphaNumericOnly(event: any) {
  const input = event.target;
  input.value = input.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '');
}
  
}
