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

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
