import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVoituresComponent } from './add-voitures/add-voitures.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ListVoituresComponent } from './list-voitures/list-voitures.component';
import { UpdateVoitureComponent } from './update-voiture/update-voiture.component';

const routes: Routes = [
 {path: "", redirectTo: "home", pathMatch: "full" },

 {
  path: 'home',
  component: HomeComponent,
  children: [
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'listVoiture', component: ListVoituresComponent  },
    { path: 'addvoiture', component: AddVoituresComponent  },
    { path: 'updatevoiture/:id', component: UpdateVoitureComponent  },

    
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
