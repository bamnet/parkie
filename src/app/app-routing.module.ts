import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './park/list/list.component';


const routes: Routes = [
  {
    path: 'parks',
    component: ListComponent,
  }, {
    path: '',
    redirectTo: '/parks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
