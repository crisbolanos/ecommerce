import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Grid } from './pages/grid/grid';
import { Tasks } from './pages/tasks/tasks';
import { Layout } from './components/layout/layout';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'grid',
        pathMatch: 'full'
      },
      {
        path: 'grid',
        component: Grid
      },
      {
        path: 'tasks',
        component: Tasks
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
