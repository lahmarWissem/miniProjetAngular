import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  roles!: Role[] ;
  newUser = new User();
  newIdRole!: number;
  newRole = new  Role;
  users!:User[];
  role!: string

  constructor(private authService :AuthService,private router :Router) { }

  ngOnInit(): void {
    this.authService.listeRoles().subscribe((mods) => {
      this.roles = mods;
      console.log(mods);
    });


  }


  addNewUser() {
    this.newRole.role = this.role
    this.newUser.roles = []
    this.newUser.roles.push(this.newRole)

    this.authService.addUser(this.newUser).subscribe(user => {
      //console.log(user)
      this.router.navigate(['/listeusers']).then(() => {
        window.location.reload()
      })
    })
  }


}
