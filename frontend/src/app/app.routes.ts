    import { Routes } from '@angular/router';
    import { LoginComponent } from './login/login.component';
    import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
    import { CitizenlistComponent } from './citizen/citizenlist/citizenlist.component';
    import { CitizenbyidComponent } from './citizen/citizenbyid/citizenbyid.component';
    import { CreatenewcitizenComponent } from './citizen/createnewcitizen/createnewcitizen.component';
    import { UpdatecitizenComponent } from './citizen/updatecitizen/updatecitizen.component';
    import { DeletecitizenComponent } from './citizen/deletecitizen/deletecitizen.component';
    import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
    import { AdminlistComponent } from './admin/adminlist/adminlist.component';
    import { AdminbyidComponent } from './admin/adminbyid/adminbyid.component';
    import { CreatenewadminComponent } from './admin/createnewadmin/createnewadmin.component';
    import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DeclarealertComponent } from './alert/declarealert/declarealert.component';
import { DeletealertComponent } from './alert/deletealert/deletealert.component';
import { EmergencyAlertsComponent } from './emergency-alerts/emergency-alerts.component';

   export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
     {
        path: 'home',
        component: LandingPageComponent
    },
    {
        path: 'userlogin',
        component: LoginComponent
    },
    {
        path: 'userdashboard',
        component: UserDashboardComponent
    },
    {
        path: 'citizenlist',
        component: CitizenlistComponent
    },
    {
        path: 'citizenbyid/:id',
        component: CitizenbyidComponent
    },
    {
        path: 'createnewcitizen',
        component: CreatenewcitizenComponent
    },
    {
        path: 'updatecitizen/:id',
        component: UpdatecitizenComponent
    },
    {
        path: 'deletecitizen/:id',
        component: DeletecitizenComponent
    },
   
    {
        path: 'adminlogin',
        component: AdminloginComponent
    },
    {
        path: 'adminlist',
        component: AdminlistComponent
    },
    {
        path: 'adminbyid/:id',
        component: AdminbyidComponent
    },
    {
        path: 'createadmin',
        component: CreatenewadminComponent
    },
    {
        path: 'admindashboard',
        component: AdminDashboardComponent
    },{
        path:'declarealert',
        component:DeclarealertComponent
    },{
        path:'deletealert',
        component:DeletealertComponent
    },
    { path: 'emergency-alerts', component: EmergencyAlertsComponent }
    // {
    //     path: '**',
    //     redirectTo: 'userdashboard'
    // }
];
