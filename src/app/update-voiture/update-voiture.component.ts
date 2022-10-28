import { Voiture } from './../models/voiture.model';
import { Modele } from './../models/modele.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-update-voiture',
  templateUrl: './update-voiture.component.html',
  styleUrls: ['./update-voiture.component.css']
})
export class UpdateVoitureComponent implements OnInit {
  modeles! : Modele[];
  updatedModId! : number;
  currentVoiture = new Voiture();
  
    constructor(private activatedRoute: ActivatedRoute,
      private router :Router,
    private voitureService: VoitureService) { }
  
    ngOnInit(): void {
      this.voitureService.listeModeles().
      subscribe(mods => {this.modeles = mods._embedded.modeles;
      console.log(mods);
      });
      this.voitureService.consulterVoiture(this.activatedRoute.snapshot.params['id']).
      subscribe( voit =>{ this.currentVoiture = voit;
      this.updatedModId = this.currentVoiture.modele.idMod;
      } ) ;
      }
  
      updateVoiture() {
        this.currentVoiture.modele = this.modeles.find(mod => mod.idMod == this.updatedModId)!;
        this.voitureService.updateVoiture(this.currentVoiture).subscribe(voit => {
        this.router.navigate(['/home/listVoiture']); }
        );
        }

}
