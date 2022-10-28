import { VoitureService } from './../services/voiture.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalVoitures :number =0;

  constructor(private voitureService :VoitureService) { }

  ngOnInit(): void {
    this.voitureService.listeVoiture().subscribe(voiture => {
      this.totalVoitures = voiture.length
    });
  }

}
