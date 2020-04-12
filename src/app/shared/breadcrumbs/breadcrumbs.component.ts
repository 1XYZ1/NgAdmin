import { Component, OnInit } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Title, Meta, MetaDefinition } from "@angular/platform-browser";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styles: [],
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;
  description: string;
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.getDataRoute().subscribe((data) => {
      this.titulo = data.titulo;
      this.description = data.description;

      this.title.setTitle(this.titulo);
      // META
      const metaTag: MetaDefinition = {
        name: "description",
        content: this.description,
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit(): void {}

  getDataRoute() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event) => event.snapshot.data)
    );
  }
}
