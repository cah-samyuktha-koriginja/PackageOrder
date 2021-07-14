import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { AngularBootstrapCheckboxGroupModule } from 'angular-bootstrap-checkbox-group';
import { Routes, RouterModule } from '@angular/router';

import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { CustomPipesModule } from '../../../pipe/custom-pipes.module';
import { CoreModule } from 'src/app/core/core.module';

import { AccountSettingsMgntComponent } from './account-settings-mgnt.component';
import { AccountsUsersCreateComponent } from './account-users/accounts-users-create/accounts-users-create.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = { suppressScrollX: true };
const routes: Routes = [
  {
    path: '',
    component: AccountSettingsMgntComponent,
    children: [
      {
        path: '',
        redirectTo: 'PatientData/New',
        pathMatch: 'full',
      },
      {
        path: 'PatientData/New',
        component: AccountsUsersCreateComponent
      }
    ]
  }
]

@NgModule({
  declarations: [AccountSettingsMgntComponent,
    AccountsUsersCreateComponent,
    
  ],
  exports:[//AngularMultiCheckboxModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    //CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeahterIconModule,
    FullCalendarModule, // import the FullCalendar module! will make the FullCalendar component available
    PerfectScrollbarModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    CoreModule,
    SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG,
      useValue: {}
    }),
    SweetAlert2Module.forRoot(),
    CustomPipesModule,
    NgxSpinnerModule,
    AngularBootstrapCheckboxGroupModule,
    //AngularMultiCheckboxModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AccountSettingsMgntModule { }

