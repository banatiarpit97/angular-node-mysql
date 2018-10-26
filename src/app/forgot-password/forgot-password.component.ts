import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
declare var particlesJS: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  change = false;
  constructor(private authService: AuthService, public router: Router, public snackBar: MatSnackBar) { 
    particlesJS.load('particles-js', '../../assets/json/particlesjs-config.json', function () {
      console.log('callback - particles.js config loaded');
    });
  }

  ngOnInit() {
    
  }

  resetPassword(form:NgForm){
    if(!this.change){
      this.authService.forgot_password(form.value.email);
      this.change = true;
    }
    else{
      this.authService.reset_password(form.value.email, form.value.password, form.value.password1, form.value.code);
      
    }
  }

}
