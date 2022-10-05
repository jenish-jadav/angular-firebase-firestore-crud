import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: any =null;
  constructor( public readonly auth: AngularFireAuth) { 
    this.auth.onAuthStateChanged((user)=>{
      this.currentUser = user;
    })
  }

  getCurrentUser(){
    return this.currentUser;
  }

  loginWithEmailPassword(username:any,password: any){  
     return this.auth.signInWithEmailAndPassword(username,password);
  }

  async logout(){
    return this.auth.signOut();
  }
}
