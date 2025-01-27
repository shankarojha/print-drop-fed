import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8005/api/users'
  private _global = new BehaviorSubject<string>('initial')

  constructor(private http: HttpClient) { }

  signup(data:any): Observable<any>{
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, data)
  }

  public global = this._global.asObservable();

  updateGlobal(str:string){
    this._global.next(str)
  }

}
