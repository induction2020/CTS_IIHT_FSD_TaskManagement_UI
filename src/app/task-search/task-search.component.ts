import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskServiceService } from '../task-service/task-service.service';
import { TaskDataService } from '../task-service/task-data.service';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {

  searckTaskForm : FormGroup;
  
  constructor(private formBuilder : FormBuilder, private router : Router,
    private taskService : TaskServiceService,
    private taskDataService : TaskDataService ) { }

  ngOnInit() {
    this.searckTaskForm = this.formBuilder.group({
      task: ['', Validators.required],
      parentName: ['', Validators.required],
      priorityFrom : ['', Validators.required],
      priorityTo: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }


  searchTask(){
    this.taskService.searchTask(this.searckTaskForm.value)
    .subscribe( data => {
      this.taskDataService.updateTaskList(data);
    });
}

onSubmit(){
  
}

}
