import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

globalState = signal<string>('initial')

  constructor() { }

  updateGlobalState(str:string){
    this.globalState.set(str)
  }
}
