import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userList = new BehaviorSubject(null);
  userListSource = this.userList.asObservable();

  private editUser = new BehaviorSubject(null);
  editUserSource = this.editUser.asObservable();

  constructor(private userService : UserService) {

   }

   initialUserList(){
     this.userService.getUsers().subscribe(
      data => {
        this.userList.next(data);
      }
     );
   }

   updateUserList(userListUpdated : any){
      this.userList.next( userListUpdated );
   }

   editUserDetails(user : User){
    this.editUser.next(user);
   }

}
