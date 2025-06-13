import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get('/api/user/profile');
  }

  updateProfile(data: { name: string; email: string; image?: File }): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (data.image) formData.append('image', data.image);
    return this.http.put('/api/user/profile', formData);
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post('/api/user/request-password-reset', { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post('/api/user/reset-password', { token, newPassword });
  }
}