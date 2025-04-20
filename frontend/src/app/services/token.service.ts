import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null;
  }

  private getPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  getUsername(): string | null {
    const payload = this.getPayload();
    return payload?.sub || null;
  }

  getUserId(): number | null {
    const payload = this.getPayload();
    return payload?.userId || null;
  }

  getRoles(): string[] {
    const payload = this.getPayload();
    return payload?.roles || [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  isTokenExpired(): boolean {
    const payload = this.getPayload();
    if (!payload?.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }
}
