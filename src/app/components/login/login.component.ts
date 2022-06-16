import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenDto } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    })
  }

  onLogin(){
    console.log(this.loginForm)

    let authObs: Observable<TokenDto>;

    authObs = this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );

    authObs.subscribe(
      (c) => {
        console.log(c)
        this.router.navigate(['/']);
      },
      (message: string) => {
        console.log(message)
        // this.viewError =  message;
        // this.loader = false;
      },
      () => {
        // this.loader = false;
      }
    );
  }

}
