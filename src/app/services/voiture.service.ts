import { ModeleWrapper } from './../models/modeleWrapper.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voiture } from '../models/voiture.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Modele } from '../models/modele.model';
import { AuthService } from './auth.service';





@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  voitures!: Voiture[];
  
  apiURLCat: string = 'http://localhost:8009/voitures/mod';
  apiURL: string = 'http://localhost:8009/voitures/api';



  constructor(private http: HttpClient ,private authService :AuthService) {
  }

  listeVoiture(): Observable<Voiture[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Voiture[]>(this.apiURL+"/all");
  }

  
  ajouterModele( mod: Modele):Observable<Modele>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Modele>(this.apiURLCat, mod,{headers:httpHeaders});
 }

  listeModeless(): Observable<Modele[]> { 
 
    return this.http.get<Modele[]>(this.apiURLCat);
  }






  consulterVoiture(id: number): Observable<Voiture> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Voiture>(url); 
  }



  ajouterVoiture( voit: Voiture):Observable<Voiture>{
  
    return this.http.post<Voiture>(this.apiURL,voit);
    }



   listeModeles(): Observable<ModeleWrapper> { 
    return this.http.get<ModeleWrapper>(this.apiURLCat);
  }

































































































































































































































































  


  rechercherParModele(idMod: number): Observable<Voiture[]> {
    const url = `${this.apiURL}/voitmod/${idMod}`;
    return this.http.get<Voiture[]>(url);
  }

  rechercherParNom(nom: string):Observable< Voiture[]> {
    const url = `${this.apiURL}/voitsByName/${nom}`;
    return this.http.get<Voiture[]>(url);
  }

  supprimerVoiture(id: number) {

    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url);
  }



  updateVoiture(prod: Voiture): Observable<Voiture> {

    return this.http.put<Voiture>(this.apiURL, prod);
  }

  trierVoitures(): void {
    this.voitures = this.voitures.sort((n1, n2) => {
      if (n1.idVoiture > n2.idVoiture) {
        return 1;
      }
      if (n1.idVoiture < n2.idVoiture) {
        return -1;
      }
      return 0;
    });
  }
 

     /*image functions*/
  
     uploadImage(file : File , filename : string) {

      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiURL + "/image/upload"}`
      return this.http.post(url ,imageFormData)
    }
  
  
    loadImage(id : number) {

      const url = `${this.apiURL + "/image/get/info"}/${id}`
      return this.http.get(url) ;
    }
  
    deleteImage(idImage : number) {
      const url = `${this.apiURL + "/image/delete"}/${idImage}`
      return this.http.delete(url)
    }
    /******************* */
    

}
