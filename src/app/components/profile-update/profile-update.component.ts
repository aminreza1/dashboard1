import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDto } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  updateProfileForm: FormGroup;
  private userSub: Subscription;
  user: UserDto;
  token: string | null = null;
  baseUrl: string;
  avatar: File;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.baseUrl = environment.apiBaseUrl;
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
    });

    this.userSub = this.authService.user.subscribe((resp) => {
      this.user = resp.user;
      this.token = resp.token;
    });
  }

  onChangeAvatar(event: any) {
    this.avatar = event.target.files[0];
  }
  onUpdateProfile() {
    var formData = new FormData();
    formData.append('first_name', this.updateProfileForm.value.firstName);
    formData.append('last_name', this.updateProfileForm.value.lastName);
    formData.append('avatar', this.avatar,this.avatar.name);
    var url =
      environment.apiBaseUrl +
      environment.apiActions.updateUserInfo +
      this.user.id;

    this.http
      .patch<any>(url, formData, {
        headers: new HttpHeaders({ Authorization: 'JWT ' + this.token}),
      })
      .subscribe(
        (res) => {
          this.router.navigate(['/profile']);
        },
        (err) => console.log(err)
      );

  }
}
