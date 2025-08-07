import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = "http://localhost:5088/api/users";

  private http = inject(HttpClient);

  private currentUser: User | null = null;

  getCurrentUser(): User | null {
    if(!this.currentUser){
      const token = this.getToken();
      if(token){
        try {
          this.currentUser = jwtDecode<User>(token);
        } catch (e) {
          console.error('Invalid token:', e);
          return null;
        }
      } else {
        return null;
      }
    }
    return this.currentUser;
  }

  isAdmin(): boolean{
    const user = this.getCurrentUser();
    return user?.role === 'Admin';
  }

  getUsername(): string {
    const user = this.getCurrentUser();
    return user ? user.unique_name : 'Not Signed In';
  }

  register(username: string, email: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/register`, {
      username,
      email,
      password
    });
  }

  login(identifier: string, password: string): Observable<{ token: string, expiresAt: Date}>{
    return this.http.post<{ token: string, expiresAt: Date}>(`${this.baseUrl}/login`, {
      identifier,
      password
    });
  }

  saveToken(token: string): void{
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null{
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean{
    return !!this.getToken();
  }

  logout(): void{
    localStorage.removeItem('auth_token');
    this.currentUser = null;
  }
}
