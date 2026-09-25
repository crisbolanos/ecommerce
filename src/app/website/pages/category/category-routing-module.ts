import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Category } from './category';

const routes: Routes = [
  {
    path: ':id',
    component: Category
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
