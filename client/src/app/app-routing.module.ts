import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/notAuth.guard';
import { CreateplayerComponent } from './components/CRUD/createplayer/createplayer.component';
import { CreatecoachComponent } from './components/CRUD/createcoach/createcoach.component';
import { UpdateplayerComponent } from './components/CRUD/updateplayer/updateplayer.component';
import { UpdatecoachComponent } from './components/CRUD/updatecoach/updatecoach.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'createplayer', component: CreateplayerComponent, canActivate: [AuthGuard] },
    { path: 'createcoach', component: CreatecoachComponent, canActivate: [AuthGuard] },
    { path: 'updateplayer/:username', component: UpdateplayerComponent, canActivate: [AuthGuard] },
    { path: 'updatecoach/:username', component: UpdatecoachComponent, canActivate: [AuthGuard] },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }