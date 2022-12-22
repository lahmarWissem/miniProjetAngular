import { Role } from '../models/role.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { RoleWrapper } from '../models/roleWrapper.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL: string = 'http://localhost:8081/users';
  apiURLRol: string = 'http://localhost:8081/users/api/rol';
  token!: string;
  public loggedUser?: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  public loggedRole?: string;
  private helper = new JwtHelperService();

  /*users: User[] = [
    { username: 'admin', password: '123', roles: ['ADMIN'] },
    { username: 'wissem', password: '123', roles: ['USER'] },
  ];*/

 


  constructor(private router: Router, private http: HttpClient) { }


  listeUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiURL+"/all");
  }

  listeRoles(): Observable<Role[]> { 
    return this.http.get<Role[]>(this.apiURLRol);
  }

  listeRolessWrap(): Observable<RoleWrapper> { 
    return this.http.get<RoleWrapper>(this.apiURLRol);
  }

  listeRolesbyiduser(id: number): Observable<Role> {
    const url = `${this.apiURLRol}/${id}`;
    return this.http.get<Role>(url);
    
  }

  ajouteruser( user: User):Observable<User>{
    return this.http.post<User>(this.apiURL, user);
    }
  
  login(user: User) {
    /*  let test ={ 
       "username": 'admin',
       "password": '123'
       } */

    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });

  }


  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }


  getToken(): string {
    return this.token;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  /* SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (
        user.username == curUser.username &&
        user.password == curUser.password
      ) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  } */

  /*image functions*/

  uploadImage(file: File, filename: string) {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post(url, imageFormData);
  }

  updateImage(file: File, filename: string) {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/update'}`;
    return this.http.put(url, imageFormData);
  }

  loadImage(id: number) {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get(url);
  }

  deleteImage(idImage: number) {
    const url = `${this.apiURL + '/image/delete'}/${idImage}`;
    return this.http.delete(url);
  }
  /******************* */
  

  isAdmin(): Boolean {
    if (!this.roles) return false;

    return this.roles.indexOf('ADMIN') >= 0;
  
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
  }
  /* 
    getUserRoles(username :string){
    this.users.forEach((curUser) => {
    if( curUser.username == username ) {
    this.roles = curUser.roles;
    }
    });
    } */

     // User 

  addUser (user: User) : Observable<User> {
    let jwt = this.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<User>(this.apiURL +"/all", user, { headers: httpHeaders });
  }

  getUsers() : Observable<User[]> {
    let jwt = this.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<User[]>(this.apiURL + "/user/all", { headers: httpHeaders })
  }

  deleteUser(id: number) {
    const url = `${this.apiURL+"/all"}/${id}`
    let jwt = this.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders })
  }

  getUserById (id: number) : Observable<User> {
    const url = `${this.apiURL + "/get"}/${id}`
    return this.http.get<User>(url)
  }

  updateUser (user: User) : Observable<User> {

    return this.http.put<User>(this.apiURL + "/update", user);
  }
}
