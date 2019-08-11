import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './park/list/list.component';
import { ShowComponent } from './park/show/show.component';


const routes: Routes = [
  {
    path: 'parks/:code',
    component: ShowComponent,
  }, {
    path: 'parks',
    component: ListComponent,
  }, {
    path: '',
    redirectTo: '/parks',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
