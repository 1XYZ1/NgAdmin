import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { UsuarioService } from "../services/service.index";
import Swal from "sweetalert2";
import { Usuario } from "../models/usuario.model";
import { Router } from "@angular/router";
declare function init_plugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
      },
      { validators: this.passwordIguales("password", "password2") }
    );
    this.forma.setValue({
      nombre: "ramon",
      email: "ramon@ramon.com",
      password: "123456",
      password2: "123456",
      condiciones: false,
    });
  }

  passwordIguales(campo1, campo2) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        passwordIguales: true,
      };
    };
  }
  crearUsuario() {
    if (!this.forma.value.condiciones) {
      Swal.fire({
        title: "Oops!",
        text: "Debes aceptar las condiciones",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }
    let usuario: Usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioService
      .crearUsuario(usuario)
      .subscribe((res) => this.router.navigateByUrl("/login"));
  }
}
