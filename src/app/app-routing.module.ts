import { UserDetailComponent } from './pages/user/detail/user-detail.component';
import { UserCreateComponent } from './pages/user/create/user-create.component';
import { UserListComponent } from './pages/user/list/user-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserListComponent },
  {
    path: 'user',
    children: [
      { path: '', component: UserListComponent },
      { path: 'new', component: UserCreateComponent },
      { path: 'edit/:id', component: UserCreateComponent },
      { path: 'detail/:id', component: UserDetailComponent }
    ],
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
