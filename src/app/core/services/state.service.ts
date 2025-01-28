import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

isLoading = signal<boolean>(false)

  constructor() { }

  updateIsLoading(isLoadingData:boolean){
    console.log("isLoadingCalled", isLoadingData)
    this.isLoading.set(isLoadingData)
  }
}
