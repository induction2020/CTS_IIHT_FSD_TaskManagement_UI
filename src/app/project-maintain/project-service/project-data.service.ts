import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from './project.service';
import { Project } from 'src/app/model/Project';

@Injectable({
  providedIn: 'root'
})

export class ProjectDataService implements OnInit{

  private projectList = new BehaviorSubject(null);
  projectListSource = this.projectList.asObservable();
  
  private editProject = new BehaviorSubject(null);
  editProjectSource = this.editProject.asObservable();

  ngOnInit(){

  }

  constructor(private projectService : ProjectService) { 
  }

  
   initialProjectList(){
     this.projectService.getProjects().subscribe(
      data => {
        this.projectList.next(data);
      }
     );
   }

   updateProjectList(projectListUpdated : any){
      this.projectList.next( projectListUpdated );
   }

   editProjectDetails(project : Project){
    this.editProject.next(project);
   }

  }