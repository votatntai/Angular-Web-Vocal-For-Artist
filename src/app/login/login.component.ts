import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Validators } from '@angular/forms'
import { UntypedFormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  btnLoading: boolean = false;

  constructor(private service: AuthService, private form: UntypedFormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  signInForm = this.form.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  signIn() {
    if (this.signInForm.valid) {
      this.btnLoading = true;
      this.service.signIn(this.signInForm.value).subscribe(result => {
        if (result.status == 200) {
          this.btnLoading = false;
          var user: User = JSON.parse(JSON.stringify(result.body));
          localStorage.setItem('USER', JSON.stringify(user));
          window.location.href = "/main/home";
        }
      }, error => {
        this.btnLoading = false;
        if (error.status == 401) {
          Swal.fire(
            'Xin lỗi!',
            'Tên đăng nhập hoặc mật khẩu không đúng!',
            'info'
          )
        }
      });
    }
  }

}
