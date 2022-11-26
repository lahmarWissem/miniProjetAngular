import { Modele } from './../models/modele.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-update-modele',
  templateUrl: './update-modele.component.html',
  styleUrls: ['./update-modele.component.css']
})
export class UpdateModeleComponent implements OnInit {

  @Input()
  modele! : Modele;
  @Input()
  ajout!:boolean;
  
  @Output()
  modeleUpdated = new EventEmitter <Modele>();
    constructor() { }
  
    ngOnInit(): void {
      console.log("ngOnInit du composant UpdateModele",this.modele);
    }
  
    saveModele(){
      this.modeleUpdated.emit(this.modele);
      
    }

}
