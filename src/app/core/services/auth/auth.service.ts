import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}&password=${password}`);
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return !!localStorage.getItem('admin');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasPermission(permission: string): boolean {
    const user = this.getUser();
    return user.permissions?.includes(permission) || false;
  }
}
