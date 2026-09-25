import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website-routing-module').then(m => m.WebsiteRoutingModule),
    data: {
      preload: true,
    }
  },
  {
    path: 'cms',
    canActivate: [adminGuard],
    loadChildren: () => import('./cms/cms-routing-module').then(m => m.CmsRoutingModule)
  },
  {
    path: '**',
    component: NotFound
  }

];
