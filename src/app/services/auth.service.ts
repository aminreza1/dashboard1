import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginDto, TokenDto, UserDto } from '../interfaces/auth.interface';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { UserStoreModel } from '../services/user-store.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<UserStoreModel>({} as UserStoreModel);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    var model: LoginDto = {
      username: username,
      password: password,
    };
    return this.http
      .post<TokenDto>(environment.apiBaseUrl + environment.apiActions.getToken, model)
      .pipe(
        catchError(this.handleError),
        tap((respData: TokenDto) => {
          console.log(respData)
          this.handleAuthentication(
            respData.user,
            respData.token,
            1440
          );
        })
      );
  }

  private handleAuthentication(
    user: UserDto,
    token: string,
    lifeMin: number
  ) {
    const expirationDate = new Date(new Date().getTime() + lifeMin * 60 * 1000);
    const userStore = new UserStoreModel(user, token, expirationDate);
    this.user.next(userStore);
    this.autoLogout(lifeMin * 60 * 1000); // Send Milisecond

    localStorage.setItem('userData', JSON.stringify(userStore));
  }

  private handleError(errorRes: HttpErrorResponse) {
    switch (errorRes.status) {
      case 400:
        return throwError('UserName or password is incorrect.');
      case 404:
        return throwError('UserName or password is incorrect.');
      case 401:
        return throwError('Access denied. The account may have been blocked');
      case 500:
        return throwError('An internal server error occurred.');
      case 0:
        return throwError('Server Unavailable.');
      default:
        console.log(errorRes)
        return throwError('Error ' + errorRes.status + ': An unknown error occurred. You can check the browser console.');
    }
  }

  autoLogin() {
    let userData: {
      user: UserDto;
      _token: string;
      _tokenExpirationDate: string;
    };
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      return;
    } else {
      userData = JSON.parse(storedUserData);
    }

    if (!userData) return;

    const loadedUser = new UserStoreModel(
      userData.user,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next({} as UserStoreModel);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
