import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, retry, throwError } from 'rxjs';
import { LoginFormValue, User } from '../models';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<User | null>(null);
  private apiUrl = environment.apiUrl
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  getUserAuth(): Observable<User | null> {
    return this.authUser$.asObservable();
  }

  login(formValue: LoginFormValue ): void | boolean {
    this.httpClient.get<User[]>(`${this.apiUrl}/usuarios`, {
      params: {
        ...formValue
      }
    }).subscribe(
      {
        next: (usuario => {
          const auth = usuario[0]
          if(auth){
            localStorage.setItem('token', auth.token)
            this.authUser$.next(auth)
            this.router.navigate(['home'])
          }else{

          }
        })
      }
    )
    return true
  }


  verificarToken(): Observable<boolean>{
    const token = localStorage.getItem('token')

    return this.httpClient.get<User[]>(`${this.apiUrl}/usuarios?token=${token}`,
    {
      headers: new HttpHeaders({
        'Authorization': token || '',
      }),
    }).pipe(
      map( usuarios => {
        const auth = usuarios[0]
        if(auth){
          localStorage.setItem('token', auth.token)
          this.authUser$.next(auth)
        }
        return !!auth
      }),
      catchError(e => {
        alert('error al verificar')
        return throwError(() => e)
      })
    )
  }


  logout(): void {
    localStorage.removeItem('token')
    this.authUser$.next(null)
    this.router.navigate(['login'])
  }

}
