import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GeneralPageComponent } from './components/general-page/general-page.component';
import { WorldsPageComponent } from './components/worlds-page/worlds-page.component';
import { WeaponsPageComponent } from './components/weapons-page/weapons-page.component';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
import { KotPageComponent } from './components/kot-page/kot-page.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

export const routes: Routes = [
  {path: "", component: LoginPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "general", component: GeneralPageComponent},
  {path: "worlds", component: WorldsPageComponent},
  {path: "weapons", component: WeaponsPageComponent},
  {path: "statistics", component: StatisticsPageComponent},
  {path: "kot", component: KotPageComponent},
  {path: "game", component: GamePageComponent},
  {path: "**", component: NotFoundPageComponent}
];