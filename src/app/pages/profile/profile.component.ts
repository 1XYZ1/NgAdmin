import { Component, OnInit } from "@angular/core";

import { UsuarioService } from "../../services/usuario/usuario.service";
import { Usuario } from "../../models/usuario.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: [],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: string;
  constructor(public _usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

  guardar(usuario: Usuario) {
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuario.nombre = usuario.nombre;
    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = undefined;
      return;
    }

    if (archivo.type.indexOf("image") < 0) {
      Swal.fire({
        title: "Error ",
        text: "Solo puedes subir imagenes",
        icon: "error",
        confirmButtonText: "Ok",
      });
      this.imagenSubir = undefined;
      return;
    }

    this.imagenSubir = archivo;

    // Vanilla

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemporal = reader.result as string);
  }
  actualizarImagen() {
    if (this.imagenSubir === undefined || this.imagenSubir === null) {
      return;
    }
    this._usuarioService.actualizarImagen(this.imagenSubir);
  }
}
