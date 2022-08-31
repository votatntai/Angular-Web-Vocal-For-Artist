import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  loading: boolean = false
  pageSize: number = 8
  pageNumber: number = 1
  isAsc: boolean = true
  projects: Project[]
  project: Project = {
    artistsStatus: [],
    countries: [],
    createDate: '',
    description: '',
    genders: [],
    id: '',
    maxAge: 0,
    minAge: 0,
    name: '',
    poster: {
      avatar: '',
      createDate: '',
      email: '',
      firstName: '',
      gender: '',
      id: '',
      lastName: '',
      phone: '',
      role: '',
      status: '',
      updateDate: '',
      username: ''
    },
    price: 0,
    projectDeadline: '',
    responseDeadline: '',
    status: '',
    updateDate: '',
    usagePurposes: [],
    voiceStyles: [],
    endDate: '',
    startDate: ''
  }
  totalPage: number = 0;

  constructor(private service: ProjectService, private form: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getProjectsDiscover();
  }

  searchForm = this.form.group({
    search: ['']
  });

  searchProjectsDiscover() {
    if (this.searchForm.valid) {
      this.getProjectsDiscover(this.searchForm.value.search!);
    }
  }

  getProjectDetail(id: string) {
    this.project = this.projects.filter(project => project.id == id)[0]
    console.log(this.project)
  }

  joinProject(id: string) {
    Swal.fire({
      title: 'Xác nhận!',
      text: "Bạn sẽ được thêm vào dự án này?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Tham Gia'
    }).then(result => {
      if (result.isConfirmed) {
        this.service.artistJoinProject(id).subscribe(result => {
          if (result.status == 200) {
            this.router.navigate(['main/jobs/detail/' + id])
          }
        })
      }
    })

  }

  getProjectsDiscover(search?: string) {
    this.loading = false;
    this.service.getProjectsDiscover(this.pageNumber, this.pageSize, this.isAsc, search).subscribe(result => {
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
      this.getProjectsDiscover(this.searchForm.value.search!);
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.loading = false;
      this.pageNumber -= 1;
      this.getProjectsDiscover(this.searchForm.value.search!);
    }
  }

  specificPage(number: number) {
    this.loading = false;
    this.pageNumber = number;
    this.getProjectsDiscover(this.searchForm.value.search!);
  }
}
