import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { PasswordConfirmedValidator } from '../validators/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: AuthService, private form: UntypedFormBuilder,) { }

  ngOnInit(): void {
  }

  registerForm = this.form.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.email],
    gender: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('(03|05|07|08|09)[0-9]{8}')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required, Validators.minLength(6)]],
    conditions: ['', Validators.requiredTrue],
  }, {
    validator: PasswordConfirmedValidator('password', 'rePassword')
  });

  register() {
    if (this.registerForm.valid) {
      var artist: any = {
        username: this.registerForm.value['username'],
        email: this.registerForm.value['email'],
        phone: this.registerForm.value['phone'],
        studio: false,
        password: this.registerForm.value['password'],
        firstName: this.registerForm.value['firstName'],
        lastName: this.registerForm.value['lastName'],
        gender: this.registerForm.value['gender'],
        price: 50000,
        bankName: '',
        bankAccountNumber: '',
        bankAccountOwner: '',
        bankBranch: ''
      }
      this.service.signUp(artist).subscribe(result => {
        if (result.status == 201) {
          this.registerForm.reset();
          Swal.fire(
            'Thành công!',
            'Bạn đã đăng ký tài khoản thành công!',
            'success'
          )
        }
      }, error => {
        Swal.fire(
          'Lỗi!',
          'Đã có lỗi xảy ra, vui lòng liên hệ bộ phận hỗ trợ!',
          'error'
        )
      });
    }
  }

}
