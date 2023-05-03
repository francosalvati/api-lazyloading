import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, map } from 'rxjs';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = environment.apiUrl

  user$ = new BehaviorSubject([])

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios`)
  }
}
