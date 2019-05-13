import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user-service/user.service';
import { Router } from '@angular/router';
import { UserDataService } from '../user-service/user-data.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html'
})
export class UserAddComponent implements OnInit {

  add_label_btn : string;
  addUserForm : FormGroup;
  constructor(private formBuilder: FormBuilder,
    private userService : UserService,
    private router : Router,
    private userDataService : UserDataService) { }

  ngOnInit() {
    this.add_label_btn = "Add User";
    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required],
      userId: ['', Validators.required],
      projectId: ['', Validators.required],
      taskId: ['', Validators.required]
    });

    this.userDataService.editUserSource.subscribe(
      data => {
        if( data!=null ){
          this.add_label_btn = "Update User";
          this.addUserForm.setValue(data);
        }
      }
    );

  }

  onSubmit(){

    if( this.add_label_btn == "Update User"){
      //Update User
      this.userService.updateUser(this.addUserForm.value).
      subscribe(
        data =>{
          this.add_label_btn = "Add User";
          this.addUserForm.reset();
          this.updateUserList();
        });

    }else{
      //Add User
      this.userService.addUser(this.addUserForm.value).
      subscribe( data => {
        this.addUserForm.reset();
        this.router.navigate(['/user-maintain']);
        this.updateUserList();
      });
    }
}


updateUserList(){
  //Update user list
  this.userService.getUsers().subscribe(
    data => {
      this.userDataService.updateUserList(data);
    }
  );
}

}
