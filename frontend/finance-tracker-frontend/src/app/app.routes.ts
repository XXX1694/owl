import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './transactions/dashboard/dashboard.component';
import { AddTransactionComponent } from './transactions/add-transaction/add-transaction.component';
import { authGuard } from './auth/auth.guard';
import { EditTransactionComponent } from './transactions/edit-transaction/edit-transaction.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'add', component: AddTransactionComponent, canActivate: [authGuard] },
  {
    path: 'edit/:id',
    component: EditTransactionComponent,
    canActivate: [authGuard],
  },
];
