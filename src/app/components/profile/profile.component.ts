import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { UserDto } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy {

  private userSub: Subscription;
  user : UserDto;
  baseUrl:string;

  constructor(private authService: AuthService) {
    this.baseUrl = environment.apiBaseUrl
   }
  
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((resp) => {
      this.user = resp.user;
    });
  }

}
