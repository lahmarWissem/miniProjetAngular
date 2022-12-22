import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  roles? :Role[];
  users!: User[];
  image: any;
  listImages: String[] = [];
  roless? = new Role();
  numberOfusers : number = 0 ;
  newUser =new User()
  IdRole! : number;
  constructor(public authService:AuthService,) { }

  ngOnInit(): void {
    this.chargerusers()
    
  }
  chargerusers() {
    this.authService.listeUsers().subscribe((voits) => {
     
      this.users = voits;
   
      this.numberOfusers = voits.length 
/* 
      this.newUser.roles = this.roles?.find(
        (rol) => rol.role_id == this.IdRole
      )!; */
      for (let index = 0; index < this.users.length; index++) {
        this.authService
          .loadImage(this.users[index].image.idImage)
          .subscribe((res: any) => {
            console.log(res.idImage)
            this.listImages[index] =
              'data:' + res.type + ';base64,' + res.image;
            
             
          });
      }
  
  });
 
  
  }
}
