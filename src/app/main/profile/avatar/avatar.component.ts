import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from 'src/app/models/artist.model';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  btnLoading: boolean = false;

  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  private fileToUpload: FormData;

  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
    if (e.base64) {
      var avatar: FormData = new FormData();
      avatar.append('avt', base64ToFile(e.base64), 'avt.png');
      this.fileToUpload = avatar;
    }
  }

  imgLoad() {
    // display cropper tool
  }

  initCropper() {
    // init cropper
  }

  imgFailed() {
    // error msg
  }

  public constructor(private service: ArtistService) {
  }

  user: User;

  artist: Artist;

  public ngOnInit(): void {
    this.getUserInfo();
    this.service.getArtistGlobal().subscribe(result => {
      this.artist = result;
    })
  }

  getUserInfo() {
    var data = localStorage.getItem('USER');
    if (data) {
      this.user = JSON.parse(data);
      if (this.user.avatar == '') {
        this.artist.avatar = environment.defaultAvatar;
      }
    }
  }

  updateAvatar() {
    if (this.fileToUpload) {
      this.btnLoading = true;
      this.service.updateAvatar(this.fileToUpload).subscribe(result => {
      }, error => {
        console.log(error);
        if (error.status == 200) {
          Swal.fire(
            'Thành công!',
            'Bạn đã đổi ảnh đại diện thành công!',
            'success'
          ).then(result => {
            this.service.getArtistInfo(this.user.id).subscribe(result => {
              var artist: Artist = result.body!;
              this.service.setArtistGlobal(artist);
            });
          })
          this.btnLoading = false;
        }
      })
    } else {
      console.warn('File not found!')
    }
  }

}
