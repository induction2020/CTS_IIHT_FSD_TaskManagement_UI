import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model/task';
import { TaskServiceService } from './task-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService implements OnInit {

  private taskList = new BehaviorSubject(null);
  taskListSource = this.taskList.asObservable();
  constructor(private taskService: TaskServiceService) {

  }

  ngOnInit() {
    
  }

  updateTaskList(taskListUpdated: Task[]) {
    this.taskList.next(taskListUpdated);
  }

  loadInitialTaskList(){
    this.taskService.getTask().
      subscribe(
        data => {
          this.taskList.next(data);
        });
  }
}
