import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:3000/api/auth/";
  // private authStatusListener = new Subject<boolean>();
  private timer;
  isAuthenticated = false;

  constructor(private http: HttpClient, public router:Router) { }
  private token = null;

  // getAuthStatusListener(){
  //   return this.authStatusListener.asObservable();
  // }

  signup(credentials){
    this.http.post(this.apiUrl + "signup", 
      { name: credentials.name, email: credentials.email, password:credentials.password})
      .subscribe((data:any) => {
        if(data.message === "success"){
          console.log("registered");
          this.router.navigate(["/login"]);
        }
      });
  }

  login(credentials){
    this.http.post(this.apiUrl+"login", 
    { email : credentials.email, password:credentials.password})
      .subscribe((data:any) => {
        if(data.message === "authentication successful"){
          this.token = data.token;
          if(this.token){
            // this.authStatusListener.next(true);
            const now = new Date();
            const expiration = new Date(now.getTime()+data.expiresIn*1000);
            this.saveAuthData(data.token, expiration);
            this.timer = setTimeout(() => {
              this.logout();
            }, data.expiresIn*1000);
            this.isAuthenticated = true;
            this.router.navigate(["/"]);
          }
          
        }
      },
      (err) => {console.log(err.error.err);});
  }

  logout(){
    this.token = null;
      // this.authStatusListener.next(false);
      clearTimeout(this.timer);
      this.clearAuthData();
    this.isAuthenticated = false;
      this.router.navigate(["/login"]);
  }

  getToken(){
    return this.token;
  }

  private saveAuthData(token:string, expirationDate:Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("expiration");

    if(!token || !expiration){
      return;
    }
    return {
      token:token,
      expiration:new Date(expiration)
    };
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expires = authInformation.expiration.getTime() - now.getTime();
    if(expires > 0){
      this.token = authInformation.token;
      // this.authStatusListener.next(true);
      this.timer = setTimeout(() => {
        this.logout();
      }, expires);
      this.isAuthenticated = true;
      return true;
    }
  }


}
