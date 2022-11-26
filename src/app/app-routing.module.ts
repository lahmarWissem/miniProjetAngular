import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVoituresComponent } from './add-voitures/add-voitures.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ListModelesComponent } from './list-modeles/list-modeles.component';
import { ListVoituresComponent } from './list-voitures/list-voitures.component';
import { UpdateVoitureComponent } from './update-voiture/update-voiture.component';
import { LoginComponent } from './login/login.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
 {path: "", redirectTo: "home", pathMatch: "full" },
 { path: 'login', component: LoginComponent },

 {
  path: 'home',
  component: HomeComponent,
  children: [
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'listVoiture', component: ListVoituresComponent  },
    { path: 'addvoiture', component: AddVoituresComponent  },
    { path: 'updatevoiture/:id', component: UpdateVoitureComponent  },
    { path: 'recherche', component: RechercheParNomComponent  },
    { path: 'listmodeles', component: ListModelesComponent  },
    { path: 'listeusers', component: ListeUsersComponent  },
    { path: 'addUser', component: AddUserComponent  }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
