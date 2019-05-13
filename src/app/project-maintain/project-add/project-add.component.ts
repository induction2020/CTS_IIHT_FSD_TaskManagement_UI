import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project-service/project.service';
import { Router } from '@angular/router';
import { ProjectDataService } from '../project-service/project-data.service';
import { UserService } from 'src/app/user-maintain/user-service/user.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html'
})
export class ProjectAddComponent implements OnInit {

  add_label_btn : string;
  addProjectForm : FormGroup;
  isChecked: any;
  users: any;

  constructor(private formBuilder: FormBuilder,
    private projectService : ProjectService,
    private router : Router,
    private projectDataService : ProjectDataService,
    private userService : UserService) { }

  ngOnInit() {
    this.add_label_btn = "Add Project";
    this.addProjectForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      project: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      priority: ['', Validators.required], 
      managerId: ['', Validators.required]
    });
  
    this.projectDataService.editProjectSource.subscribe(
      data => {
        if( data!=null ){
          this.add_label_btn = "Update Project";
          this.addProjectForm.setValue(data);
        }
      }
    );

    this.userService.getUsers().subscribe(
      data =>{
        this.users = data;
      }
    );

  }

  onSubmit(){

    if( this.add_label_btn == "Update Project"){
      //Update Project
      this.projectService.updateProject(this.addProjectForm.value).
      subscribe(
        data =>{
          this.add_label_btn = "Add Project";
          this.addProjectForm.reset();
          this.updateProjectList();
        });

    }else{
      //Add Project
      this.projectService.addProject(this.addProjectForm.value).
      subscribe( data => {
        this.addProjectForm.reset();
        this.router.navigate(['/project-maintain']);
        this.updateProjectList();
      });
    }
}


updateProjectList(){
  //Update project list
  this.projectService.getProjects().subscribe(
    data => {
      this.projectDataService.updateProjectList(data);
    }
  );
}

enableDate(){
  const startDate = this.addProjectForm.get('startDate');
  const endDate = this.addProjectForm.get('endDate');
  if(true){
    startDate.disable;
    endDate.disable;
  }else{
    startDate.enable;
    endDate.enable;
  }

}

}
