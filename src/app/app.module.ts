import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AddVoituresComponent } from './add-voitures/add-voitures.component';
import { ListVoituresComponent } from './list-voitures/list-voitures.component';
import { UpdateVoitureComponent } from './update-voiture/update-voiture.component';
import { ListModelesComponent } from './list-modeles/list-modeles.component';
import { UpdateModeleComponent } from './update-modele/update-modele.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './services/token.interceptor';
import { ListeUsersComponent } from './liste-users/liste-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { PasswordComponent } from './password/password.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogAnimationsExampleComponent } from './dialog-animations-example/dialog-animations-example.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    AdminDashboardComponent,
    HeaderComponent,
    AddVoituresComponent,
    ListVoituresComponent,
    UpdateVoitureComponent,
    ListModelesComponent,
    UpdateModeleComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    LoginComponent,
    ListeUsersComponent,
    AddUserComponent,
    ForbiddenComponent,
    UpdateUserComponent,
    PasswordComponent,
    SpinnerComponent,
    DragAndDropComponent,
    DialogAnimationsExampleComponent,

  
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    DragDropModule,

  
   

     
  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



