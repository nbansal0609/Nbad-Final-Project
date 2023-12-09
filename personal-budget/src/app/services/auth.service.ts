import { Injectable, ErrorHandler, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../config';
import { Tokens } from '../services/tokens';
import { NavbarService } from './navbar.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {


  private readonly JWT_TOKEN = 'PB_JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'PB_REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient,
    private navbarService: NavbarService,
    private errorService: ErrorService) {
    navbarService.updateLoginStatus(this.isLoggedIn());
    this.populateUserFromToken();
  }

  public postUserData(creds): any {
    return this.http.post<any>(`${config.apiUrl}/signup`, creds)
      .pipe(
        tap((response) => {
          console.log('signup', response);
          if (response.errno != null) { this.errorService.handleError(response); }
        }),
        catchError(error => {
          return of(false);
        }));
  }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/login`, user)
      .pipe(
        tap((tokens) => {
          this.doLoginUser(user.username, tokens);
        }),
        mapTo(true),
        catchError(error => {
          console.log('catch', error);
          this.errorService.handleError(error);
          return of(false);
        }));
  }

  logout() {
    console.log('Logging out');
    return this.http.post<any>(`${config.apiUrl}/logout`, {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(() => {
        this.doLogoutUser();
      }),
      mapTo(true),
      catchError(error => {
        console.log('logout error', error);
        this.errorService.handleError(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return this.tokenValid();
  }

  refreshToken(): Observable<boolean> {
    const savedToken = {
      refreshToken: this.getRefreshToken()
    };
    return this.http.post<any>(`${config.apiUrl}/refresh`, savedToken)
      .pipe(
        tap((tokens) => {
          console.log(tokens);
          this.storeJwtToken(tokens.jwt);
        }),
        mapTo(true),
        catchError(error => {
          console.log('catch', error);
          this.errorService.handleError(error);
          // alert(error);
          return of(false);
        }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  tokenValid() {
    if (!!this.getJwtToken()) {
      return !this.tokenExpired();
    } else {
      console.log('No token');
      return false;
    }
  }

  tokenExpired() {
    const token = this.getJwtToken();
    const jwtDecode = JSON.parse(atob(token.split('.')[1]));
    console.log(jwtDecode);
    console.log('Creation time: ', new Date(jwtDecode.iat * 1000));
    console.log('Current time: ', new Date(Date.now()));
    console.log('Expire time: ', new Date(jwtDecode.exp * 1000));
    if (
      token &&
      jwtDecode.exp < Date.now() / 1000
    ) {
      console.log('Token expired');
      return true;
    }
    console.log('Token not expired');
    return false;
  }

  private populateUserFromToken() {
    if (this.tokenValid()) {
      const token = this.getJwtToken();
      const jwtDecode = JSON.parse(atob(token.split('.')[1]));
      this.loggedUser = jwtDecode.username;
    } else {
      this.loggedUser = undefined;
    }
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    console.log('Do login token', tokens);
    this.storeTokens(tokens);
    this.navbarService.updateLoginStatus(true);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.navbarService.updateLoginStatus(false);
    this.removeTokens();
  }

  private getRefreshToken() {
    console.log('Get refresh token', localStorage.getItem(this.REFRESH_TOKEN));
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    console.log('Storing token', jwt);
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  public removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  ngOnDestroy() {
    this.removeTokens();
  }

}
