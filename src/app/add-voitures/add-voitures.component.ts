import { VoitureService } from './../services/voiture.service';
import { Voiture } from './../models/voiture.model';
import { Modele } from './../models/modele.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '../models/image.model';

@Component({
  selector: 'app-add-voitures',
  templateUrl: './add-voitures.component.html',
  styleUrls: ['./add-voitures.component.css']
})
export class AddVoituresComponent implements OnInit {
  modeles!: Modele[];
  newVoiture = new Voiture();
  newIdMod!: number;
  newModele!: Modele;
  message: string = '';

  uploadedImage!: File;
  image: any;
  response: any;
  constructor(private voitureService :VoitureService,private router : Router) { }

  ngOnInit(): void {
    this.voitureService.listeModeles().subscribe((mods) => {
      this.modeles = mods._embedded.modeles;
      console.log(mods);
  });
} 
addVoiture() {
  this.voitureService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((response: any) => {
      this.voitureService
        .loadImage(response.idImage)
        .subscribe((image: any) => {
          let img = new Image();
          img.idImage = image.idImage;
          img.name = image.name;
          img.type = image.type;
          img.image = image.image;
          this.newVoiture.image = new Image();
          this.newVoiture.image = img;
          
          this.newVoiture.modele = this.modeles.find(
            (mod) => mod.idMod == this.newIdMod
          )!;
          this.voitureService
            .ajouterVoiture(this.newVoiture)
            .subscribe((voit) => {
              console.log(voit);
              this.router.navigate(['/home/listVoiture']);
            });
        });
    });
}

onImageUpload(event: any) {
  this.uploadedImage = event.target.files[0];
}

}
