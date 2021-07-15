import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Admin',
        loadChildren: () => import('./views/pages/account-settings-mgnt/account-settings-mgnt.module').
          then(m => m.AccountSettingsMgntModule)
      },
      { path: '', redirectTo: 'Admin', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'Admin', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
