import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskServiceService } from '../task-service/task-service.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  addTaskForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,  private taskService : TaskServiceService) {

   }

  ngOnInit() {
    this.addTaskForm = this.formBuilder.group({
      task: ['', Validators.required],
      parentName: ['', Validators.required],
      priority: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit(){
    this.taskService.addTask(this.addTaskForm.value)
    .subscribe( data => {
      this.router.navigate(['view-task']);
    });
}

}
