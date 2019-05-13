import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project-service/project.service';
import { ProjectDataService } from '../project-service/project-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomOrderByPipePipe } from 'src/app/utils/custom-order-by-pipe.pipe';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html'
})
export class ProjectSearchComponent implements OnInit {

  projectSearchForm : FormGroup;
  projects : any
  constructor(private formBuilder: FormBuilder,
    private projectService : ProjectService,
    private projectDataService: ProjectDataService,
    private orderPipe : CustomOrderByPipePipe) {

  }

  ngOnInit() {
    this.projectSearchForm = this.formBuilder.group({
      project : ['', Validators.required]
    });

    this.projectDataService.projectListSource.subscribe(
      data => {
        this.projects = data;
      }
    );
  }


  onSubmit(){
    //alert('firstName : '+ this.projectSearchForm.value.firstName );
    this.projectService.searchProject( this.projectSearchForm.value ).
    subscribe(
      data => {
        this.projectDataService.updateProjectList(data);
      }
    );
  }

  sortProjectsBy(orderBy :string){
    //alert('sortProjectsBy :' +orderBy);
   this.projectDataService.updateProjectList(
     this.orderPipe.transform(this.projects, orderBy));
  }
  

  
}
