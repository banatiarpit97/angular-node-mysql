import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 
declare var particlesJS:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService:AuthService) {
    particlesJS.load('particles-js', '../../assets/json/particlesjs-config.json', function () {
      console.log('callback - particles.js config loaded');
    });
  }

  ngOnInit() {
  }

  signup(form: NgForm){
    console.log(form.value);
    this.authService.signup(form.value);
  }

}
