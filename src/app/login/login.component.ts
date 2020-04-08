import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Usuario } from "../models/usuario.model";
import { CLIENT_ID } from "../config/config";
import { UsuarioService } from "../services/service.index";
declare function init_plugins();
declare const gapi: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;
  auth2: any;
  constructor(public route: Router, private _usuarioService: UsuarioService) {}

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem("email") || "";

    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id: CLIENT_ID,
        cookiepolicy: "single_host_origin",
        scope: "profile email",
      });

      this.attachSignin(document.getElementById("btnGoogle"));
    });
  }
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      // console.log(profile);

      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService
        .loginGoogle(token)
        .subscribe((resp) => (window.location.href = "#/dashboard"));
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe((resp) => this.route.navigateByUrl("/dashboard"));

    // this.route.navigateByUrl("/dashboard");
  }
}
