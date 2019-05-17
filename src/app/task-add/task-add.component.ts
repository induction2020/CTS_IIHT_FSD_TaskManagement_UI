import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskServiceService } from '../task-service/task-service.service';
import { ProjectService } from '../project-maintain/project-service/project.service';
import { UserService } from '../user-maintain/user-service/user.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  addTaskForm : FormGroup;
  tasks : any;
  projects : any;
  users : any;
  taskSel : string = '';
  taskIdSel : number;
  projectSel : string = '';
  projectIdSel : number;
  userSel : string = '';
  userIdSel : number;
  task : Task;

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private taskService : TaskServiceService,
    private projectService : ProjectService,
    private userService : UserService) {

   }

  ngOnInit() {
    this.addTaskForm = this.formBuilder.group({
      project: ['', Validators.required],
      task: ['', Validators.required],
      parentName: ['', Validators.required],
      priority: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      user: ['', Validators.required],
    });

    this.taskService.getTask().subscribe(
      data =>{
        this.tasks = data;
      }
    );

    this.projectService.getProjects().subscribe(
      data => {
        this.projects = data;
      }
    );

    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      }
    );

  }

  onSubmit(){
    
    this.task = this.addTaskForm.value;
    this.task.projectId = this.projectSel['projectId'];
    this.task.userId = this.userSel['userId'];
    this.task.parentId = this.taskSel['taskId'];


    if(this.task.task ==null ||
      this.task.projectId ==null ||
      this.task.userId ==null ||
      this.task.startDate ==null ||
      this.task.endDate ==null  ){
      alert('Please fill all the details');
      return;
    }


   
    this.taskService.addTask(this.task)
    .subscribe( data => {
      this.router.navigate(['view-task']);
    });
}

selectProject(){
  this.addTaskForm.controls['project'].setValue(this.projectSel['project']);
  
}

selectParentTask(){
  this.addTaskForm.controls['parentName'].setValue(this.taskSel['task']);
}

selectUser(){
  this.addTaskForm.controls['user'].setValue(this.userSel['firstName']+' '
  + this.userSel['lastName'] );
}

enableParentTask(){
  
}


}
