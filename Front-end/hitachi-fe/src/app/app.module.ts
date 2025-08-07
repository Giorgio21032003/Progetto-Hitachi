import { NgModule } from "@angular/core";
import { MatToolbarModule, MatIconModule, MatButtonModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { HomePageComponent } from "src/pages/home-page/home-page.component";
import { LoginPageComponent } from "src/pages/login-page/login-page.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePageComponent,
    LoginComponent,
    LoginPageComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
