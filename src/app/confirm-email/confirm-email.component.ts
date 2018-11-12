import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
declare var particlesJS: any;

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, public snackBar: MatSnackBar) {
    particlesJS.load('particles-js', '../../assets/json/particlesjs-config.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }
  ngOnInit() {
  }

  confirmEmail(form: NgForm) {
      this.authService.confirm(form.value.code, form.value.email)
        .subscribe((data: any) => {
          if (data.status === "success") {
            this.snackBar.open(data.message, "close", {
              duration: 3000,
              panelClass: ['green-snackbar']
            });
            this.router.navigate(["/login"]);
          }
        });
  }

}
