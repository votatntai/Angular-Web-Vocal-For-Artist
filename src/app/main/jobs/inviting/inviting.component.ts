import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-inviting',
  templateUrl: './inviting.component.html',
  styleUrls: ['./inviting.component.css']
})
export class InvitingComponent implements OnInit {


  loading: boolean = false;
  projects: Project[];
  totalPage: number = 0;
  pageSize: number = 12;
  pageNumber: number = 1;
  isAsc: boolean = true;

  constructor(private service: ProjectService, private form: FormBuilder) { }

  ngOnInit(): void {
    this.getInvitingProjects();
  }

  searchForm = this.form.group({
    search: ['']
  });

  searchInvitingProjects() {
    if (this.searchForm.valid) {
      this.getInvitingProjects(this.searchForm.value.search!);
    }
  }

  getInvitingProjects(search?: string) {
    this.loading = false;
    this.service.getInviteProject(this.pageNumber, this.pageSize, this.isAsc, search).subscribe(result => {
      if (result.body != null) {
        var response: any = result.body;
        var totalRow = response['totalRow'];
        this.totalPage = Math.ceil(totalRow / this.pageSize);
        this.projects = response['data'];
        this.loading = true;
      }
    }, error => {
      if (error.status == 404) {
        this.projects = [];
        this.totalPage = 0;
        this.loading = true;
      }
    });
  }

  nextPage() {
    if (this.pageNumber < this.totalPage) {
      this.loading = false;
      this.pageNumber += 1;
      this.getInvitingProjects(this.searchForm.value.search!);
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.loading = false;
      this.pageNumber -= 1;
      this.getInvitingProjects(this.searchForm.value.search!);
    }
  }

  specificPage(number: number) {
    this.loading = false;
    this.pageNumber = number;
    this.getInvitingProjects(this.searchForm.value.search!);
  }

}
