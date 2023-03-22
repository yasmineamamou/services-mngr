import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompteComponent } from './compte.component';
import {AddCompteComponent } from "./add-compte/add-compte.component";
const routes: Routes = [
  {
    path: '',
    component: CompteComponent,
  
  children: [
    {
      path: 'add-compte',
      component: AddCompteComponent,
    },
  ],},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CompteRoutingModule {
}
