import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material'; 
import { Router } from '@angular/router';
declare var particlesJS:any;
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  confirm = false;

  constructor(private authService: AuthService, public router: Router, public snackBar: MatSnackBar) {
    particlesJS.load('particles-js', '../../assets/json/particlesjs-config.json', function () {
      console.log('callback - particles.js config loaded');
    });
  }

  ngOnInit() {
  }

  signup(form: NgForm){
    console.log(form.value);
    if(!this.confirm){
      this.authService.signup(form.value)
        .subscribe((data: any) => {
          if (data.status === "success") {
            this.confirm = true;
            console.log("registered");
            this.snackBar.open(data.message, "close", {
              duration: 3000,
              panelClass: ['green-snackbar']
            });
          }
        });
    }
    else{
      this.authService.confirm(form.value.code, form.value.email)
        .subscribe((data:any) => {
          if (data.status === "success") {
            this.confirm = false;
            this.snackBar.open(data.message, "close", {
              duration: 3000,
              panelClass: ['green-snackbar']
            });
            this.router.navigate(["/login"]);
          }
        });
    } 
  }

}
