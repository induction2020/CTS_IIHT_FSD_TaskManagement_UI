import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { UserMaintainComponent } from './user-maintain/user-maintain.component';
import { ProjectMaintainComponent } from './project-maintain/project-maintain.component';

const routes: Routes = [
{path: '', component: TaskViewComponent },
{path: 'add-task', component : TaskAddComponent},
{path: 'edit-task', component : TaskUpdateComponent},
{path: 'view-task', component : TaskViewComponent},
{path: 'user-maintain', component : UserMaintainComponent},
{path: 'project-maintain', component : ProjectMaintainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
