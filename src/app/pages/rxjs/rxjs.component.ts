import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { retry, map, filter } from "rxjs/operators";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscripcion: Subscription;
  constructor() {
    this.subscripcion = this.regresaObservable()
      .pipe(retry(2))
      .subscribe(
        numero => console.log(numero),
        error => console.error("Error", error),
        () => console.log("Se ha terminado")
      );
  }
  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscripcion.unsubscribe();
    console.log("Se ha salido");
  }

  regresaObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      const source = interval(1000);
      let intervalo = setInterval(() => {
        contador++;

        const salida: Object = {
          valor: contador
        };
        observer.next(salida);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        // if (contador === 2) {
        //   observer.error("No work");
        // }
      }, 1000);
    }).pipe(
      map((resp: any) => resp.valor),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          //Impar
          return true;
        } else {
          // Par
          return false;
        }
      })
    );
  }
}
