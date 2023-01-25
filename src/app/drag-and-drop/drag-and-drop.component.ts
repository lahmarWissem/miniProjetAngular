import { Voiture } from './../models/voiture.model';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Modele } from '../models/modele.model';

import { AuthService } from '../services/auth.service';
import { VoitureService } from '../services/voiture.service';
import { Image } from '../models/image.model';
@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  image: any;
  listImages: String[] = [];
  voitures!: Voiture[];
  voitureselled!: Voiture[];
  voituressold!: Voiture[];
  voituresforselling!: Voiture[];
  numberOfvoitures: number = 0;
  IdModele!: number;
  modeles!: Modele[];
  sellingVoitures: Voiture[] = [];
  typeVoiture!: string;
  selling = "selling";
  sold = "sold";
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  constructor(private voitureService: VoitureService, public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.chargerVoituresselled(this.selling);
    this.chargerVoituressold(this.sold);

  }



  drop(event: CdkDragDrop<Voiture[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      if (event.currentIndex >= event.previousIndex) {
        //move every item from the currentindex to to the previous index doun to 1 and updateVoiture  position 
        for (let i = event.currentIndex; i >= event.previousIndex; i--) {
          event.container.data[i].position--;
          this.voitureService.updateVoiture(event.container.data[i]).subscribe(car => {
            console.log(car);
          });
          console.log("i=" + i)
          console.log(event.container.data[i])
        }
       } else {
        //move every item from the previous index  to to the current index up to 1 and updateVoiture position 
        for (let i = event.previousIndex; i >= event.currentIndex; i--) {
          event.container.data[i].position++;
          this.voitureService.updateVoiture(event.container.data[i]).subscribe(car => {
            console.log(car);
          });
        }
      }
      event.container.data[event.currentIndex].position = event.currentIndex;
      this.voitureService.updateVoiture(event.container.data[event.currentIndex]).subscribe(voit => {
        console.log(voit)
      });
    } else {
      console.log("hhh="+event.previousContainer.data[event.previousIndex])
      console.log(event)
      const voiture = event.previousContainer.data[event.previousIndex];
      // Remove the voiture from the previous container
      event.previousContainer.data.splice(event.previousIndex, 1);
      // Add the voiture to the new container
      event.container.data.splice(event.currentIndex, 0, voiture);
      // Update the voiture's position and status in the database
      if (event.container.data === this.voituresforselling) {
          voiture.position = event.currentIndex;
          voiture.type = 'selling';
          // Update the positions of all the voitures in the "selling" list
          this.voituresforselling.forEach((v, i) => {
              v.position = i;
              this.voitureService.updateVoiture(v).subscribe(updatedVoiture => {
                  console.log(updatedVoiture);
              });
          });
      } else {
          voiture.position = this.voituresforselling.length + event.currentIndex;
          voiture.type = 'sold';
          // Update the positions of all the voitures in the "sold" list
          this.voituressold.forEach((v, i) => {
              v.position = i + this.voituresforselling.length;
              this.voitureService.updateVoiture(v).subscribe(updatedVoiture => {
                  console.log(updatedVoiture);
              });
          });
      }
      this.voitureService.updateVoiture(voiture).subscribe(updatedVoiture => {
          console.log(updatedVoiture);
      });
  }
}

  chargerVoituresselled(type: string) {
    this.voitureService.findbyType(this.sold).subscribe((voits) => {
      console.log(voits);
      this.voituressold = voits;
      console.log("sold" + this.voituressold)
      this.numberOfvoitures = voits.length



    });



  }
  chargerVoituressold(type: string) {
    this.voitureService.findbyType(this.selling).subscribe((voits) => {
      console.log(voits);
      this.voituresforselling = voits;
      console.log("for selling" + this.voituresforselling)
      this.numberOfvoitures = voits.length



    });
  }
  chargerVoiture() {
    this.voitureService.listeVoiture().subscribe((voits) => {
      console.log(voits);
      this.voitures = voits;
      console.log(this.voitures)
      this.numberOfvoitures = voits.length



    });



  }
  supprimerVoiture(p: Voiture) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.voitureService.supprimerVoiture(p.idVoiture).subscribe(() => {
        console.log('produit supprimé');
        this.chargerVoiture();
      });
  }

}
