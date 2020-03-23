import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Rutas
import { AppRoutingModule } from "./app-routing.module";
// Componentes
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";

// MODULOS
import { PagesModule } from "./pages/pages.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
