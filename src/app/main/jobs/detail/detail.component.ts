import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistProject, ProjectDetail } from 'src/app/models/project-detail.model';
import { Artist, VoiceDemo } from 'src/app/models/voical.model';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  loading: boolean = false;
  id: string;
  user: User;
  projectDetail: ProjectDetail;
  defaultAvatar: string = environment.defaultAvatar;
  artistProject: ArtistProject = {
    quickArtistResponse: {
      id: '',
      username: '',
      firstName: '',
      lastName: 0,
      email: '',
      phone: '',
      bio: '',
      gender: '',
      studio: 0,
      price: 0,
      rate: 0,
      status: '',
      avatar: '',
      countries: [],
      voiceStyles: [],
    },
    invitedDate: '',
    requestedDate: '',
    joinedDate: '',
    canceledDate: '',
    finishedDate: '',
    reviewDate: '',
    status: '',
    rate: 0,
    comment: '',
  };
  artistVoiceDemo: VoiceDemo[] = [];
  listArtist: Artist[] = [];
  artistSearch: string = '';
  pageNumber: number = 1;
  pageSize: number = 5;

  voiceDemoLoading: boolean = false;

  voiceToUpload: File | null = null;

  constructor(private router: ActivatedRoute, private service: ProjectService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getProjectById();
    this.getCurrentUser();
  }

  getCurrentUser() {
    var user: User = JSON.parse(localStorage.getItem('USER')!);
    this.user = user;
  }

  getProjectById() {
    this.loading = false;
    this.service.getProjectDetail(this.id).subscribe(result => {
      if (result.body != null) {
        this.projectDetail = result.body as any;
        this.loading = true;
      }
    }, error => {
      this.loading = true;
    });
  }

  downloadFile(url: string, fileName: string) {
    this.spinner.show();
    this.service.downloadFile(url).subscribe(result => {
      let blob: Blob = result.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
      this.spinner.hide();
    });
  }

  downloadAudio(id: string, fileName: string) {
    this.spinner.show();
    console.warn(id);
    this.service.downloadVoice(id).subscribe(result => {
      this.spinner.hide();
    }, error => {
      let a = document.createElement('a');
      a.download = fileName;
      a.href = error.error['text'];
      a.click();
      this.spinner.hide();
    });
  }

  getArtistProject(id: string) {
    this.projectDetail.artistProject.forEach(artist => {
      if (artist.quickArtistResponse.id == id) {
        this.getArtistVoiceDemo(id);
        this.artistProject = artist
      }
    })
  }

  getArtistVoiceDemo(id: string) {
    this.voiceDemoLoading = true;
    this.service.getArtistVoiceDemo(id).subscribe(result => {
      this.artistVoiceDemo = result.body['data']!;
      if (result.status == 200) {
        this.voiceDemoLoading = false;
      }
    })
  }

  acceptToJoinProject() {
    Swal.fire({
      title: 'Xác nhận!',
      text: "Bạn sẽ được thêm vào dự án này?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Tham Gia'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.service.acceptToJoinProject(this.projectDetail.id).subscribe(result => {
          this.spinner.hide();
          this.getProjectById();
        }, error => {
          this.spinner.hide();
        })
      }
    })

  }

  avoidToJoinProject() {
    Swal.fire({
      title: 'Xác nhận!',
      text: "Bạn sẽ bị xóa khỏi dự án này?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Từ Chối'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.service.avoidToJoinProject(this.projectDetail.id).subscribe(result => {
          this.spinner.hide();
          this.getProjectById();
        }, error => {
          this.spinner.hide();
        })
      }
    })
  }

  uploadVoiceToProject(event: any) {
    var files = event.target.files;
    this.voiceToUpload = files.item(0);
    const formData: FormData = new FormData();
    formData.append('file', this.voiceToUpload!, this.voiceToUpload!.name);
    this.spinner.show();
    this.service.uploadVoiceToProject(this.projectDetail.id, formData).subscribe(result => {
      this.spinner.hide();
      this.getProjectById();
    }, error => {
      this.spinner.hide();
      this.getProjectById();
    });
  }

}