import { Injectable, inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { BehaviorSubject, from, map, tap } from 'rxjs';
import { LoginPayload } from '../models/user.model';
import { environment } from '../../../../api/supabaseClient';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.supabaseUrl}/auth/v1`;
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  private httpClient = inject(HttpClient);
  currentUser$ = this.currentUserSubject.asObservable();

  signInWithEmail(payload: LoginPayload) {
    const url = `${this.apiUrl}/token?grant_type=password`;
    const authPayload = {
      email: payload.email,
      password: payload.password,
    };
    return this.httpClient.post<any>(url, authPayload).pipe(
      tap((data) => {
        console.log(data);
        this.currentUserSubject.next(data.user);
        localStorage.setItem(
          'sb-alctsactbltnlwmyhifw-auth-token',
          JSON.stringify(data),
        );
      }),
    );
  }
  signOut() {
    const url = `${this.apiUrl}/logout`;
    return this.httpClient.post<any>(url, {}).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        localStorage.removeItem('sb-alctsactbltnlwmyhifw-auth-token');
      }),
    );
  }
}
