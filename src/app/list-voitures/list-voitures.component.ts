import { VoitureService } from './../services/voiture.service';
import { Component, OnInit } from '@angular/core';
import { Voiture } from '../models/voiture.model';

@Component({
  selector: 'app-list-voitures',
  templateUrl: './list-voitures.component.html',
  styleUrls: ['./list-voitures.component.css']
})
export class ListVoituresComponent implements OnInit {

  constructor(private voitureService :VoitureService) { }
  image: any;
  listImages: String[] = [];
  voitures!: Voiture[];
  numberOfvoitures : number = 0 ;

  ngOnInit(): void {
    this.chargerVoitures();
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

}
