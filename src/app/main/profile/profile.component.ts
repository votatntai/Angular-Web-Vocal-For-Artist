import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Artist } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordConfirmedValidator } from 'src/app/validators/validator';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private service: AuthService,
    private artistService: ArtistService,
    private form: FormBuilder,
  ) { }

  user: User;
  artist: Artist;
  defaultAvatar: string = environment.defaultAvatar;
  rate: number;
  loading: boolean = false;

  updateProfileForm = this.form.group({
    price: [0, [Validators.required, Validators.min(50000), Validators.max(50000000)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    bio: ['', [Validators.required, Validators.minLength(50)]],
    studio: [false, Validators.required],
    gender: ['', Validators.required],
    bankName: ['', Validators.required],
    bankAccountNumber: ['', Validators.required],
    bankAccountOwner: ['', Validators.required],
    bankBranch: ['', Validators.required],
  });

  updatePasswordForm = this.form.group({
    currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required, Validators.minLength(6)]]
  }, {
    validator: PasswordConfirmedValidator('newPassword', 'rePassword')
  });

  ngOnInit(): void {
    this.artistService.getArtistGlobal().subscribe(result => {
      this.artist = result;
    })
    this.getUserInfo();
    this.getArtistInfo();
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

  getArtistInfo() {
    this.loading = false;
    this.artistService.getArtistInfo(this.user.id).subscribe(result => {
      if (result.body) {
        this.artist = result.body;
        this.artistService.setArtistGlobal(this.artist);
        this.updateProfileForm.setValue({
          price: this.artist.price,
          firstName: this.artist.firstName,
          lastName: this.artist.lastName,
          bio: this.artist.bio,
          studio: this.artist.studio,
          gender: this.artist.gender,
          bankName: this.artist.bankName,
          bankBranch: this.artist.bankBranch,
          bankAccountNumber: this.artist.bankAccountNumber,
          bankAccountOwner: this.artist.bankAccountOwner,
        });
        this.rate = this.artist.rate;
        this.loading = true;
      }
    });
  }

  updateProfile() {
    if (this.updateProfileForm.valid) {
      this.artistService.updateArtistInfo(this.updateProfileForm.value).subscribe(result => {
        if (result.status == 200) {
          console.log(result.body)
          this.artistService.setArtistGlobal(result.body);
          Swal.fire(
            'Thành công!',
            'Thông tin người dùng đã được cập nhật!',
            'success'
          )
        }
      }, error => {
        console.log(error);
      })
    }
  }

  updatePassword() {
    var currentPassword = this.updatePasswordForm.value['currentPassword'];
    var newPassword = this.updatePasswordForm.value['newPassword'];
    var rePassword = this.updatePasswordForm.value['rePassword'];
    if (this.updatePasswordForm.valid) {
      if (newPassword != rePassword) {
        Swal.fire(
          'Thử lại!',
          'Mật khẩu mới và mật khẩu xác nhận không giống nhau!',
          'info'
        )
      } else if (currentPassword == newPassword) {
        Swal.fire(
          'Xin lỗi!',
          'Mật khẩu mới không được trùng với mật khẩu cũ!',
          'info'
        )
      } else {
        this.service.changePassword(this.user.email, newPassword, currentPassword).subscribe(result => {
          if (result.status == 200) {
            this.updatePasswordForm.reset();
            Swal.fire(
              'Thành công!',
              'Mật khẩu của bạn đã được thay đổi!',
              'success'
            )
          } else {
            Swal.fire(
              'Lỗi!',
              'Đã có lỗi xảy ra, vui lòng liên hệ bộ phận hỗ trợ!',
              'error'
            )
          }
        }, error => {
          if (error.error['data'] == 'OLD_PASSWORD_INVALID') {
            Swal.fire(
              'Xin lỗi!',
              'Mật khẩu hiện tại không đúng!',
              'warning'
            )
          }
        });
      }
    }
  }

}
