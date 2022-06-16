import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  username: string = 'None';
  token: string = 'None';
  isAuth: boolean = false;
  sidebarOpened = true;
  sidebarMode : MatDrawerMode = 'side';
  sm = 960;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.autoLogin();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuth = user.isAuth;
      this.token = user.token ?? 'None';
      this.username = user.user.username;
    });
  }

  toggleSidebar() {
    if (this.sidebarOpened) this.sidebarOpened = false;
    else this.sidebarOpened = true;
  }
  onSideNavClose(){
    this.sidebarOpened = false;
 }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
