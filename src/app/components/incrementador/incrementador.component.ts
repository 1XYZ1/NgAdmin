import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild("txtProgress") txtProgress: ElementRef;
  @Input("nombre") leyenda: string = "";
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onChanges(newValue: number) {
    // let elementHtml: any = document.getElementsByName("progreso")[0];
    console.log(this.txtProgress.nativeElement.value);
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.txtProgress.nativeElement.value = Number(this.progreso);
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = Number(this.progreso) + Number(valor);
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }
}
