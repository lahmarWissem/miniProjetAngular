import { User } from './../models/user.model';
import { VoitureService } from './../services/voiture.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalVoitures :number =0;
  totalModels :number =0;
  totalUsers :number =0;

  constructor(private voitureService :VoitureService,private authService :AuthService) { }

  ngOnInit(): void {
    this.voitureService.listeVoiture().subscribe(voiture => {
      this.totalVoitures = voiture.length
    });

    this.voitureService.listeModeless().subscribe(modele =>{
      this.totalModels=modele.length
      console.log("this is models ",this.totalModels)
    });
    this.authService.listeUsers().subscribe(user =>{
      this.totalUsers=user.length
      console.log("this is models ",this.totalModels)
    });
  }



}
