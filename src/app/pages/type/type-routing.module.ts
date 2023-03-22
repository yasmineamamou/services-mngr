import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeComponent } from './type.component';
import {AddTypeComponent } from "./add-type/add-type.component";
const routes: Routes = [
  {
    path: '',
    component: TypeComponent,
  
  children: [
    {
      path: 'add-type',
      component: AddTypeComponent,
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
export class TypeRoutingModule {
}
