import { VoitureService } from './../services/voiture.service';
import { Modele } from './../models/modele.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-modeles',
  templateUrl: './list-modeles.component.html',
  styleUrls: ['./list-modeles.component.css']
})
export class ListModelesComponent implements OnInit {
  modeles! :Modele[];
  ajout:boolean=true;

  updatedMod : Modele = {"idMod":0,"nomMod":""};
  
  constructor(private voitureService: VoitureService) { }

  ngOnInit(): void {
this.chargerModeles();
}
modeleUpdated(mod:Modele){
  console.log("Categorie Rece Du composant Update Modele",mod)
  this.voitureService.ajouterModele(mod).subscribe( ()=> this.chargerModeles());

}
chargerModeles(){
  this.voitureService.listeModeles().
  subscribe(mods => {this.modeles = mods._embedded.modeles;
  console.log(mods);
});
  }
  
  updateMod(mod:Modele) {
    this.updatedMod=mod;
    this.ajout=false;
    }
}
