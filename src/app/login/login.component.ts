import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


declare var particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, router:Router) {
    particlesJS.load('particles-js', '../../assets/json/particlesjs-config.json', function () {
      console.log('callback - particles.js config loaded');
    });
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log(form.value);
    this.authService.login(form.value);
  }

}
