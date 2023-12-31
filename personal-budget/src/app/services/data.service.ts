import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Budget } from './budget';

import { AuthService } from './auth.service';

import { config } from './../config';
import { Expense } from './expense';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, public authService: AuthService) { }

  public getAllBudgetData(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${config.apiUrl}/budget?user=${this.authService.getLoggedUser()}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  public getExpenseDetailsForBudgetAndMonth(budgetId: number, month: string): Observable<Expense[]> {
    const url = `${config.apiUrl}/expenses?budgetId=${budgetId}&month=${month}`;
    return this.http.get<Expense[]>(url)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  public getBudget(id: number): Observable<Budget> {
    if (id === 0) {
      return of(this.initializeBudget());
    }
    const url = `${config.apiUrl}/budget/${id}`;
    return this.http.get<Budget>(url)
      .pipe(
        tap(data => console.log('getBudget: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  public createBudget(budget: Budget): Observable<Budget> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    budget.id = null;
    return this.http.post<Budget>(`${config.apiUrl}/budget`, budget, { headers })
      .pipe(
        tap(data => console.log('createBudget: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  public deleteBudget(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${config.apiUrl}/budget/${id}`;
    return this.http.delete<Budget>(url, { headers })
      .pipe(
        tap(data => console.log('deleteBudget: ', id)),
        catchError(this.handleError)
      );
  }

  public updateBudget(budget: Budget): Observable<Budget> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${config.apiUrl}/budget/${budget.id}`;
    return this.http.put<Budget>(url, budget, { headers })
      .pipe(
        tap(() => console.log('updateBudget: ', budget.id)),
        map(() => budget),
        catchError(this.handleError)
      );
  }

  public insertExpense(expense: Expense): Observable<Expense> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${config.apiUrl}/expenses`; // Update the URL based on your backend API
    return this.http.post<Expense>(url, expense, { headers })
      .pipe(
        tap(() => console.log('insertExpense: ', expense)),
        map(() => expense),
        catchError(this.handleError)
      );
  }




  private handleError(err): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeBudget(): any {
    // Return an initialized object
    return [{
      id: 0,
      title: null,
      budget: null,
      color: null,
      expenses: 0,
      username: this.authService.getLoggedUser()
    }];
  }

}
