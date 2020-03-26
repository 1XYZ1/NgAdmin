import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//Componentes
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { NopagefoundComponent } from "../shared/nopagefound/nopagefound.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";

const PagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "progress", component: ProgressComponent },
      { path: "graficas1", component: Graficas1Component },
      { path: "account-settings", component: AccountSettingsComponent },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  },
  { path: "**", component: NopagefoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(PagesRoutes)],
  exports: [RouterModule]
})
export class PageRoutingModule {}
