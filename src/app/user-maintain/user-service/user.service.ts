import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/User';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { UserSearch } from 'src/app/model/UserSearch';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  baseUrl = 'http://localhost:8098/users/'

  

  getUsers(): Observable<User[]> {
    let userList = this.httpClient.get<User[]>(this.baseUrl).pipe(
      map(users => users),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        //this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<User[]>(`getUsers`))
    );

    return userList;

  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }


  searchUser(userSearch : UserSearch): Observable<User[]> {
    let userList = this.httpClient.post<User[]>(this.baseUrl+'search', userSearch).pipe(
      map(users => users),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        //this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<User[]>(`searchTask`))
    );

    return userList;

  }


  addUser(user: User): any {
    return this.httpClient.post<any>(this.baseUrl, user);
  }

  updateUser(user: User): any {
    return this.httpClient.put<any>(this.baseUrl, user); 
  }

  deleteUser(userId: number): any {
    return this.httpClient.delete<any>(this.baseUrl + userId);
  }

  getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + userId).pipe(
      map(task => task),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
      }),
      catchError(this.handleError<User>(`getUserById`))
    );
  }



}
