import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskListComponent } from './task-list/task-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import { TaskViewComponent } from './task-view/task-view.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { UserMaintainComponent } from './user-maintain/user-maintain.component';
import { UserAddComponent } from './user-maintain/user-add/user-add.component';
import { UserSearchComponent } from './user-maintain/user-search/user-search.component';
import { UserListComponent } from './user-maintain/user-list/user-list.component';
import { CustomOrderByPipePipe } from './utils/custom-order-by-pipe.pipe';
import { ProjectMaintainComponent } from './project-maintain/project-maintain.component';
import { ProjectAddComponent } from './project-maintain/project-add/project-add.component';
import { ProjectListComponent } from './project-maintain/project-list/project-list.component';
import { ProjectSearchComponent } from './project-maintain/project-search/project-search.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskAddComponent,
    TaskUpdateComponent,
    TaskListComponent,
    TaskViewComponent,
    TaskSearchComponent,
    UserMaintainComponent,
    UserAddComponent,
    UserSearchComponent,
    UserListComponent,
    CustomOrderByPipePipe,
    ProjectMaintainComponent,
    ProjectAddComponent,
    ProjectListComponent,
    ProjectSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CustomOrderByPipePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
