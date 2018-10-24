import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  login = false;
  // private authListenerSubs: Subscription;
  private isAuthenticated = false;
  constructor(private http: HttpClient, public authService: AuthService) {
    
  }

  ngOnInit() {
    this.authService.autoAuthUser();
    // this.authListenerSubs = this.authService.getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.isAuthenticated = isAuthenticated;
    //     if(!this.isAuthenticated){
    //     }
    //   });

  }

  ngOnDestroy(): void {
    // this.authListenerSubs.unsubscribe();
  }
}
