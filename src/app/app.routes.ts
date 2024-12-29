import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee/employee-list/employee.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeSearchComponent } from './employee/employee-search/employee-search.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
export const routes: Routes = [
    {
        path:'', redirectTo:'login', pathMatch:'full'
    },
    {
        path:'login',component:LoginComponent
    },
    {
        path:'',component:LayoutComponent,
        children : [
            { path:'dashboard',  component:DashboardComponent, canActivate:[authGuard]},
            { path:'employee',  component:EmployeeComponent, canActivate:[authGuard]},
            { path:'employee/create',  component:EmployeeCreateComponent, canActivate:[authGuard]},
            { path:'employee/edit/:id', component:EmployeeEditComponent, canActivate:[authGuard]},
            { path:'employee/:id', component:EmployeeDetailComponent, canActivate:[authGuard]},
            { path:'employee-search', component:EmployeeSearchComponent, canActivate:[authGuard]},
        
        ]
    }

    

];