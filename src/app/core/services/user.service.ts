import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3001/api/users'

  constructor(private http: HttpClient) { }

  signup(data:any): Observable<any>{
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, data)
  }

}
