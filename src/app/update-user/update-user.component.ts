import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  roles!: Role[] ;
  newUser = new User();
  newIdRole!: number;
  newRole = new  Role;
  users!:User[];
  role!: String
  uploadedImage!: File;
  image: any;
  response: any;
  user = new User()
  userRole = new Role()
  constructor(private authService :AuthService,private router :Router,private activatedRoute: ActivatedRoute, ) { }

  
  updateUser() {
    this.userRole.role = this.role
    this.user.roles = []
    this.user.roles.push(this.userRole)
    this.authService.updateUser(this.user).subscribe(user => {
      this.router.navigate(['/home/listeusers']).then(() => {
        window.location.reload()
      })
    })
  }

  ngOnInit(): void {
    this.authService.getUserById(this.activatedRoute.snapshot.params['id']).subscribe(user => {
      this.user = user
      this.role =this.user.roles[0].role
    })
  }
}
