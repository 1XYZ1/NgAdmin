import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Usuario } from "src/app/models/usuario.model";
import { URL_SERVICIOS } from "src/app/config/config";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(private http: HttpClient, public router: Router) {
    console.log("Servicio listo");
    this.cargarStorage();
  }

  estaLogeado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = "";
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.token = "";
    this.usuario = null;
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("id");

    this.router.navigateByUrl("/login");
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";

    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        console.log(resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }
  login(usuario: Usuario, recuerdame: boolean) {
    let url = URL_SERVICIOS + "/login";

    if (recuerdame) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        // localStorage.setItem("id", resp.id);
        // localStorage.setItem("token", resp.token);
        // localStorage.setItem("usuario", JSON.stringify(resp.usuario));

        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          title: "Buen trabajo! " + usuario.nombre,
          text: "Te has registrado correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        });
        return resp.usuario;
      })
    );
  }
}
