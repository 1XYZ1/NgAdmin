import { Component, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styles: []
})
export class ProgressComponent implements OnInit {
  progreso1: number = 10;
  progreso2: number = 20;

  constructor() {}

  ngOnInit(): void {}
}
