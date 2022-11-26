import { Modele } from './../models/modele.model';
import { VoitureService } from './../services/voiture.service';
import { Component, OnInit } from '@angular/core';
import { Voiture } from '../models/voiture.model';
import { ThisReceiver } from '@angular/compiler';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-voitures',
  templateUrl: './list-voitures.component.html',
  styleUrls: ['./list-voitures.component.css']
})
export class ListVoituresComponent implements OnInit {

  constructor(private voitureService :VoitureService,public authService :AuthService,private router: Router) { }
  image: any;
  listImages: String[] = [];
  voitures!: Voiture[];
  numberOfvoitures : number = 0 ;
  IdModele! : number;
  modeles! : Modele[];

  ngOnInit(): void {
    
    this.chargerVoitures();
    
    this.voitureService.listeModeles().
    subscribe(mods => {this.modeles = mods._embedded.modeles;
    console.log(mods);
  });
    
  }
 

  chargerVoitures() {
    this.voitureService.listeVoiture().subscribe((voits) => {
      console.log(voits);
      this.voitures = voits;
      this.numberOfvoitures = voits.length
      for (let index = 0; index < this.voitures.length; index++) {
        this.voitureService
          .loadImage(this.voitures[index].image.idImage)
          .subscribe((res: any) => {
            //console.log(res.name)
            this.listImages[index] =
              'data:' + res.type + ';base64,' + res.image;
          });
      }
      
    });
  }


  supprimerVoiture(p: Voiture) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.voitureService.supprimerVoiture(p.idVoiture).subscribe(() => {
        console.log('produit supprimé');
        this.chargerVoitures();
      });
  }


  onChange() {
    this.voitureService.rechercherParModele(this.IdModele).
    subscribe(voits =>{this.voitures=voits
      for (let index = 0; index < this.voitures.length; index++) {
        this.voitureService
          .loadImage(this.voitures[index].image.idImage)
          .subscribe((res: any) => {
            //console.log(res.name)
            this.listImages[index] =
              'data:' + res.type + ';base64,' + res.image;
          });
      }
    });
    }
  

}
