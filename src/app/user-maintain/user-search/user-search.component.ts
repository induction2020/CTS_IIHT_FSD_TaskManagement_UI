import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { UserSearch } from 'src/app/model/UserSearch';
import { UserDataService } from '../user-service/user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomOrderByPipePipe } from 'src/app/utils/custom-order-by-pipe.pipe';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html'
})
export class UserSearchComponent implements OnInit {

  userSearchForm : FormGroup;
  users : any
  constructor(private formBuilder: FormBuilder,
    private userService : UserService,
    private userDataService: UserDataService,
    private orderPipe : CustomOrderByPipePipe) {

  }

  ngOnInit() {
    this.userSearchForm = this.formBuilder.group({
      firstName : ['', Validators.required]
    });

    this.userDataService.userListSource.subscribe(
      data => {
        this.users = data;
      }
    );
  }


  onSubmit(){
    //alert('firstName : '+ this.userSearchForm.value.firstName );
    this.userService.searchUser( this.userSearchForm.value ).subscribe(
      data => {
        this.userDataService.updateUserList(data);
      }
    );
  }

  sortUsersBy(orderBy :string){
    //alert('sortUsersBy :' +orderBy);
   this.userDataService.updateUserList(
     this.orderPipe.transform(this.users, orderBy));
  }
  

  
}
