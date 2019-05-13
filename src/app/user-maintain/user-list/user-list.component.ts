import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { User } from 'src/app/model/User';
import { UserDataService } from '../user-service/user-data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  constructor(private userService : UserService,
    private userDataService : UserDataService) {

    }

  users : User[];

  ngOnInit() {
    this.userDataService.initialUserList();

    this.userDataService.userListSource.subscribe(
      data => {
        this.users = data;
      }
    );
  }


  deleteUser(user : User) : void{
    this.userService.deleteUser(user.userId).
    subscribe(
      data => {
        this.users = this.users.filter(u => u!==user);
        this.userDataService.updateUserList(this.users);
      }
    );
  }


  editUser(user : User) : void {
    this.userDataService.editUserDetails(user);
  }
}
