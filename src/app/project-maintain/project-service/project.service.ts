import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from 'src/app/model/Project';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "http://localhost:8098/projects/";

  getProjects(): Observable<Project[]> {
    let projectList = this.httpClient.get<Project[]>(this.baseUrl).pipe(
      map(projects => projects),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        //this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Project[]>(`getProjects`))
    );

    return projectList;

  }
  

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        return of(result as T);
      };
    }

    searchProject(projectSearch : Project): Observable<Project[]> {
      let projectList = this.httpClient.post<Project[]>(this.baseUrl+'search', projectSearch).pipe(
        map(projects => projects),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Project[]>(`searchTask`))
      );
  
      return projectList;
  
    }
  
  
    addProject(project: Project): any {
      return this.httpClient.post<any>(this.baseUrl, project);
    }
  
    updateProject(project: Project): any {
      return this.httpClient.put<any>(this.baseUrl, project); 
    }
  
    deleteProject(projectId: number): any {
      return this.httpClient.delete<any>(this.baseUrl + projectId);
    }
  
    getProjectById(projectId: string): Observable<Project> {
      return this.httpClient.get<Project>(this.baseUrl + projectId).pipe(
        map(task => task),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Project>(`getProjectById`))
      );
    }
  }