import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsuarioService } from "./usuario/usuario.service";
import {
  SettingsService,
  SharedService,
  SidebarService,
  LoginGuardGuard,
  SubirArchivosService,
} from "./service.index";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivosService,
    LoginGuardGuard,
  ],
})
export class ServiceModule {}
