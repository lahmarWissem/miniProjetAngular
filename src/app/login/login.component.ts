import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  err: number = 0;

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {}
  /*   onLoggedin()
  {
  this.authService.login(this.user).subscribe((data)=> {
  let jwToken = data.headers.get('Authorization')!;
  this.authService.saveToken(jwToken);
  this.router.navigate(['/']);
  },(erreur)=>{ this.err = 1;
  }); */

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
        console.log(this.err);
      },
    });
  }

}
