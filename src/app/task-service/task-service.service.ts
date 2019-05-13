import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { TaskSearch } from '../model/taskSearch';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService{
  
  constructor(private httpClient: HttpClient) {

  }

  baseUrl = 'http://localhost:8098/tasks/'

  getTask(): Observable<Task[]> {
    let taskList = this.httpClient.get<Task[]>(this.baseUrl).pipe(
      map(tasks => tasks),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        //this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Task[]>(`getTask`))
    );

    return taskList;

  }

  searchTask(taskSearch : TaskSearch): Observable<Task[]> {
    let taskList = this.httpClient.post<Task[]>(this.baseUrl+'search', taskSearch).pipe(
      map(tasks => tasks),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        //this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Task[]>(`getTask`))
    );

    return taskList;

  }

 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      return of(result as T);
    };
  }

  addTask(task: Task): any {
    return this.httpClient.post<any>(this.baseUrl, task);
  }

  updateTask(task: Task): any {
    // let header = new HttpHeaders();
    // header.append('Content-Type', 'application/json');
    // header.append('Access-Control-Allow-Origin', 'http://localhost:8098');

    return this.httpClient.put<any>(this.baseUrl, task); 
  }

  deleteTask(taskId: number): any {
    return this.httpClient.delete<any>(this.baseUrl + taskId);
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.httpClient.get<Task>(this.baseUrl + taskId).pipe(
      map(task => task),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
      }),
      catchError(this.handleError<Task>(`getTaskById`))
    );
  }

}
