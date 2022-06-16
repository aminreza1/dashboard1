import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDto } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit,OnDestroy {

  private userSub: Subscription;
  user : UserDto;
  baseUrl:string;

   constructor(private authService: AuthService) {
    this.baseUrl = environment.apiBaseUrl
   }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((resp) => {
      this.user = resp.user;  
    });
  }

}
