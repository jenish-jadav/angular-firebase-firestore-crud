import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  errorMessage: String="";

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private authService: AuthenticationService
    ) { }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.value; }

  onLoginClick(){

    this.errorMessage="";
    if (!this.loginForm.valid) {
      this.errorMessage="Fill required information!"
      return;
    }

    this.authService.loginWithEmailPassword(this.f.email,this.f.password).then((user)=>{
      this.router.navigate(['/admin']);
    }).catch((error)=>{
      this.errorMessage=error.message
    });
    
  }

}
