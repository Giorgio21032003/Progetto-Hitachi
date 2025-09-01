
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';

// COMPONENTI
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { HomePageComponent } from 'src/pages/home-page/home-page.component';
import { LoginPageComponent } from 'src/pages/login-page/login-page.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ModaleDispositiviComponent } from './components/modale-dispositivi/modale-dispositivi.component';
import { UtenteService } from 'src/api/utente.service';
import { DispositivoService } from 'src/api/dispositivo.service';
import { ManutenzioneService } from 'src/api/manutenzione.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';




@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    HomePageComponent,
    LoginPageComponent,
    ModaleDispositiviComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatMenuModule

  ],
  providers: [UtenteService,DispositivoService,ManutenzioneService],
  bootstrap: [AppComponent],

})
export class AppModule { }

