import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//Componentes
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { NopagefoundComponent } from "../shared/nopagefound/nopagefound.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard } from "../services/service.index";

const PagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { titulo: "Dashboard", description: "Aquí va una descripcion" },
      },
      {
        path: "progress",
        component: ProgressComponent,
        data: { titulo: "Progress", description: "Aquí va una descripcion" },
      },
      {
        path: "graficas1",
        component: Graficas1Component,
        data: { titulo: "Graficas", description: "Aquí va una descripcion" },
      },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: {
          titulo: "Account Settings",
          description: "Aquí va una descripcion",
        },
      },
      {
        path: "promesas",
        component: PromesasComponent,
        data: { titulo: "Promesas", description: "Aquí va una descripcion" },
      },
      {
        path: "rxjs",
        component: RxjsComponent,
        data: { titulo: "Observables", description: "Aquí va una descripcion" },
      },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    ],
  },
  { path: "**", component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(PagesRoutes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
