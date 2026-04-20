import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../api/supabaseClient';

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const anonKey = environment.supabaseKey;
  let authToken = anonKey;

  const sessionData = localStorage.getItem(
    'sb-alctsactbltnlwmyhifw-auth-token',
  );

  if (sessionData) {
    try {
      const parsedSession = JSON.parse(sessionData);
      if (parsedSession?.access_token) {
        authToken = parsedSession.access_token;
      }
    } catch (e) {}
  }

  const headers = request.headers
    .set('apikey', anonKey)
    .set('Authorization', `Bearer ${authToken}`)
    .set('Content-Type', 'application/json')
    .set('Prefer', 'return=minimal');

  const req = request.clone({ headers });

  return next(req);
}
