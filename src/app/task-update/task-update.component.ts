import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskServiceService } from '../task-service/task-service.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  updateTaskForm : FormGroup;

  constructor( private router : Router,
    private taskService : TaskServiceService,
    private formBuilder : FormBuilder) { }

  ngOnInit() {

    let taskId = window.localStorage.getItem('editTaskId');
    if(!taskId){
      this.router.navigate(['view-task']);
    } 

    this.updateTaskForm = this.formBuilder.group({
      taskId: ['', Validators.required],
      parentId: ['', Validators.required],
      task: ['', Validators.required],
      parentName: ['', Validators.required],
      priority: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.taskService.getTaskById(taskId)
    .subscribe(
      data => {
        this.updateTaskForm.setValue(data);
      }
    );
  }

  onSubmit(): void{
    this.taskService.updateTask(this.updateTaskForm.value)
    .pipe(first())
      .subscribe(
        data => {
          if(data!=null) {
            //alert('Task updated successfully.');
            this.router.navigate(['view-task']);
          }else {
            alert("Error Occurred");
          }
        },
        error => {
          alert(error);
        });
  }

}
