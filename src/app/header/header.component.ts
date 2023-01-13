import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  roles? :Role[];
  users!: User[];
  image: any;
  ImageUser: any;
  roless? = new Role();
  numberOfusers : number = 0 ;
  newUser =new User()
  IdRole! : number;
  x? : string;
  constructor(public authService:AuthService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  this.chargerusers()
    
  }

  chargerusers() {
    console.log()
   this.x=this.authService.loggedUser;
  this.authService.loadImageUser(this.x).subscribe((res: any) => {
      
        this.ImageUser ='data:' + res.type + ';base64,' + res.image;
        
        
        

        
         
      });
  }

 
  
  }

