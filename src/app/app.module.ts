import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import * as AllComponents from './component/index';

import { State } from './data/index';
import { EmployeeService } from './service/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'employees',
        component: AllComponents.ListComponent
      }, {
        path: '',
        redirectTo: '/employees',
        pathMatch: 'full'
      }, {
        path: 'employee/:id',
        component: AllComponents.DetailComponent
      }, {
        path: 'new',
        component: AllComponents.NewEmpComponent
      }
    ])
  ],
  providers: [
    EmployeeService, State
  ],
  declarations: [
    AppComponent,
    AllComponents.DetailComponent,
    AllComponents.ListComponent,
    AllComponents.ListItemComponent,
    AllComponents.NewEmpComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
