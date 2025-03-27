import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, tap } from "rxjs"
import { environment } from "@environments/environment"
import type { User } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl
  private tokenKey = "auth_token"
  private userSubject = new BehaviorSubject<User | null>(null)
  public user$ = this.userSubject.asObservable()

  constructor(private http: HttpClient) {
    this.loadUser()
  }

  private loadUser(): void {
    const token = this.getToken()
    if (token) {
      this.fetchUserProfile().subscribe()
    }
  }

  register(userData: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/api/user/register`, userData).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token)
          this.fetchUserProfile().subscribe()
        }
      }),
    )
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/api/user/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token)
          this.fetchUserProfile().subscribe()
        }
      }),
    )
  }

  fetchUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/user/profile`).pipe(
      tap((user) => {
        this.userSubject.next(user)
      }),
    )
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/api/user/profile`, userData).pipe(
      tap((updatedUser) => {
        const currentUser = this.userSubject.value
        this.userSubject.next({ ...currentUser, ...updatedUser })
      }),
    )
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey)
    this.userSubject.next(null)
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }
}

