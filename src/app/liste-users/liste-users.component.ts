import { Router } from '@angular/router';
import { Role } from './../models/role.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})
export class ListeUsersComponent implements OnInit {
  roles? :Role[];
  users!: User[];
  image: any;
  listImages: String[] = [];
  roless? = new Role();
  numberOfusers : number = 0 ;
  IdRole! : number;

  constructor(public authService :AuthService,private router:Router) { }

  ngOnInit(): void {

    this.chargerusers();

}
chargerusers() {
  this.authService.listeUsers().subscribe((voits) => {
   
    this.users = voits;
 
    this.numberOfusers = voits.length 
    for (let index = 0; index < this.users.length; index++) {
      this.authService
        .loadImage(this.users[index].image.idImage)
        .subscribe((res: any) => {
          //console.log(res.name)
          this.listImages[index] =
            'data:' + res.type + ';base64,' + res.image;
        });
    }

});

}

deleteUser (id: number) {
  if (confirm('Sure!')) {
    this.authService.deleteUser(id).subscribe(() => {
      this.router.navigate(['/home/listeusers']).then(() => {
        window.location.reload()
      })
    })
  }
}
}
      
   

  


