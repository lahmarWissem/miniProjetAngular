import { VoitureService } from './../services/voiture.service';
import { Component, OnInit } from '@angular/core';
import { Voiture } from '../models/voiture.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent implements OnInit {
  nomVoiture! :string;
  voitures! : Voiture[];
  allVoitures! : Voiture[];
 searchTerm!: string;
 numberOfvoitures : number = 0 ;
 listImages: String[] = [];
  constructor(private voitureService :VoitureService) { }

  ngOnInit(): void {


      this.voitureService.listeVoiture().subscribe((voits) => {
        console.log(voits);
        this.voitures = voits;
        this.numberOfvoitures = voits.length;
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
 



  rechercherProds(){
    
    this.voitureService.rechercherParNom(this.nomVoiture).subscribe(voits => {
    this.voitures = voits;
    console.log(voits)});

    
    }
    onKeyUp(filterText : string){
      this.voitures = this.allVoitures.filter(item =>
      item.nomVoiture.toLowerCase().includes(filterText));
      
      }
}
