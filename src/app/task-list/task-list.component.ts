import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { TaskServiceService } from '../task-service/task-service.service';
import { Router } from '@angular/router';
import { TaskDataService } from '../task-service/task-data.service';
import { User } from '../model/User';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskServiceService,
     private router: Router,
     private taskDataService : TaskDataService) { }

  tasks: Task[];

  ngOnInit() {
   
    this.taskDataService.loadInitialTaskList();

    this.taskDataService.taskListSource.subscribe(
      dataTasks => this.tasks = dataTasks 
    );
      
  }

  editTask(task: Task): void { 
    window.localStorage.removeItem('editTaskId');
    window.localStorage.setItem('editTaskId', task.taskId.toString());
    this.router.navigate(['/edit-task']);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.taskId)
      .subscribe(data => {
        this.tasks = this.tasks.filter(u => u !== task);
        this.taskDataService.updateTaskList( this.tasks);
      })
  }

}