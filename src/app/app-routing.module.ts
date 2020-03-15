import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin-console', component: AdminConsoleComponent },
    { path: 'user-detail/:id', component: UserDetailComponent },
    { path: 'add-user', component: AddUserComponent },
    {
        path: "**",
        redirectTo: '/login'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
