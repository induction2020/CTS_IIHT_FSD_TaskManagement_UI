

import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project-service/project.service';
import { Project } from 'src/app/model/Project';
import { ProjectDataService } from '../project-service/project-data.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  constructor(private projectService : ProjectService,
    private projectDataService : ProjectDataService) {

    }

  projects : Project[];

  ngOnInit() {
    this.projectDataService.initialProjectList();

    this.projectDataService.projectListSource.subscribe(
      data => {
        this.projects = data;
      }
    );
  }


  deleteProject(project : Project) : void{
    this.projectService.deleteProject(project.projectId).
    subscribe(
      data => {
        this.projects = this.projects.filter(u => u!==project);
        this.projectDataService.updateProjectList(this.projects);
      }
    );
  }


  editProject(project : Project) : void {
    project.managerId = "";
    this.projectDataService.editProjectDetails(project);
  }
}
