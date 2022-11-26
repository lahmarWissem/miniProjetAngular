import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'voitures';


  constructor(public authService: AuthService, private router: Router) {}
  

  /*   ngOnInit() {
    let isloggedin: string;
    let loggedUser: string;
    isloggedin = localStorage.getItem('isloggedIn');
    loggedUser = localStorage.getItem('loggedUser');
    if (isloggedin != 'true' || !loggedUser) this.router.navigate(['/login']);
    else this.authService.setLoggedUserFromLocalStorage(loggedUser);
  } */
  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken()=='' || this.authService.isTokenExpired())
    this.router.navigate(['/login']);    
  }

  onLogout() {
    this.authService.logout();
  }
}
