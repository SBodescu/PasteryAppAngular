import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { BehaviorSubject, from, map, tap } from 'rxjs';
import { LoginPayload } from '../types/user.model';
import { environment } from '../../api/supabaseClient';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly supabase: SupabaseClient;
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
    console.log(this.currentUser$);
  }
  signInWithEmail(payload: LoginPayload) {
    const authPromise = this.supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    return from(authPromise).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
      tap((data) => {
        this.currentUserSubject.next(data.user);
      }),
    );
  }
  getUser() {
    return from(this.supabase.auth.getUser()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data.user;
      }),
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
    );
  }

  signOut() {
    return from(this.supabase.auth.signOut()).pipe(
      map(({ error }) => {
        if (error) throw error;
      }),
      tap(() => {
        this.currentUserSubject.next(null);
      }),
    );
  }
}
