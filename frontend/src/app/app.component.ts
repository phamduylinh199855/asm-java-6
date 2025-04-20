import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map, mergeMap} from 'rxjs';
import {TokenService} from './services/token.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Quynh';
  currentUsername: string | null = '';
  isAdmin = false;
  isTokenExpired = false;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);
  private tokenService = inject(TokenService);

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.firstChild;
        while (route?.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route?.data ?? [])
    ).subscribe(data => {
      if (data['title']) {
        this.title = data['title'];
        this.titleService.setTitle(this.title);
      }
    });

    this.currentUsername = this.tokenService.getUsername();
    this.isAdmin = this.tokenService.hasRole('ADMIN');
    this.isTokenExpired = this.tokenService.isTokenExpired();

  }

  logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  }

}
