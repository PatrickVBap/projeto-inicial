import { ChartComponent } from './chart/chart.component';
import { BoxInitComponent } from './../../../primeiro-projeto/src/app/box-init/box-init.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: BoxInitComponent},
  {path: 'chart-energy', component: ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }