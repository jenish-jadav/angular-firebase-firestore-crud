import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.css']
})
export class AdminContainerComponent implements OnInit {
  public name: string | null | undefined = "";
  public userData: firebase.default.User|null=null;
  constructor(
    private router: Router,
    public readonly auth: AngularFireAuth,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
      this.name = "Guest";
      this.listenAuthStatusChange();  
  }

  listenAuthStatusChange(){
     this.auth.currentUser.then((user)=>{
      this.userData = user;
      this.name = user?.displayName || 'Guest';
    });
  }

  onLogoutClick(): void {
    this.authService.logout().then(()=>{
      this.router.navigate(['/login']);
    }).catch((error)=>{
      //TODO: display alert/flash message
      console.log(error);
    });
  }
}
