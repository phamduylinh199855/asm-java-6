import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.baseUrl, {
      username: username,
      password: password
    });
  }
}
