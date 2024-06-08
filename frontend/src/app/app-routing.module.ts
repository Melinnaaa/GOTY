import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { hasRoleGuard } from './guards/has-role.guard';
import { authRoleGuardGuard } from './guards/auth-role-guard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    canMatch: [isLoggedInGuard],
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'admin',
    canMatch: [hasRoleGuard],
    canActivate: [authRoleGuardGuard],
    data:{
      allowedRoles: [1]
    },
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'search',
    canMatch: [hasRoleGuard],
    canActivate: [authRoleGuardGuard],
    data:{
      allowedRoles: [1]
    },
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'see-users',
    canMatch: [hasRoleGuard],
    canActivate: [authRoleGuardGuard],
    data:{
      allowedRoles: [1]
    },
    loadChildren: () => import('./see-users/see-users.module').then( m => m.SeeUsersPageModule)
  },
  {
    path: 'delete-user',
    canMatch: [hasRoleGuard],
    canActivate: [authRoleGuardGuard],
    data:{
      allowedRoles: [1]
    },
    loadChildren: () => import('./delete-user/delete-user.module').then( m => m.DeleteUserPageModule)
  },
  {
    path: 'update-user',
    canMatch: [hasRoleGuard],
    canActivate: [authRoleGuardGuard],
    data:{
      allowedRoles: [1]
    },
    loadChildren: () => import('./update-user/update-user.module').then( m => m.UpdateUserPageModule)
  },
  {
    path: 'account',
    canMatch: [isLoggedInGuard],
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'solicitud',
    canMatch: [isLoggedInGuard],
    loadChildren: () => import('./solicitud/solicitud.module').then( m => m.SolicitudPageModule)
  },
  {
    path: 'ver-solicitudes',
    canMatch: [isLoggedInGuard],
    loadChildren: () => import('./ver-solicitudes/ver-solicitudes.module').then( m => m.VerSolicitudesPageModule)
  },
  {
    path: 'admin-solicitudes',
    canMatch: [hasRoleGuard],
    canActivate: [authRoleGuardGuard],
    data:{
      allowedRoles: [1]
    },
    loadChildren: () => import('./admin-solicitudes/admin-solicitudes.module').then( m => m.AdminSolicitudesPageModule)
  },
  {
    path: 'reservar-recurso',
    canMatch: [isLoggedInGuard],
    loadChildren: () => import('./reservar-recurso/reservar-recurso.module').then( m => m.ReservarRecursoPageModule)
  },
  {
    path: 'admin-recursos',
    canMatch: [hasRoleGuard],
    canActivate: [authRoleGuardGuard],
    data:{
      allowedRoles: [1]
    },
    loadChildren: () => import('./admin-recursos/admin-recursos.module').then( m => m.AdminRecursosPageModule)
  },
  {
    path: 'horario',
    canMatch: [hasRoleGuard],
    canActivate: [authRoleGuardGuard],
    data:{
      allowedRoles: [1]
    },
    loadChildren: () => import('./horario/horario.module').then( m => m.HorarioPageModule)
  },
  {
    path: 'ver-horarios',
    canMatch: [isLoggedInGuard],
    loadChildren: () => import('./ver-horarios/ver-horarios.module').then( m => m.VerHorariosPageModule)
  },
  {
    path: 'editar-turno/:fecha',
    canMatch: [hasRoleGuard],
    canActivate: [authRoleGuardGuard],
    data:{
      allowedRoles: [1]
    },
    loadChildren: () => import('./editar-turno/editar-turno.module').then( m => m.EditarTurnoPageModule)
  },
  {
    path: 'crear-admin',
    canMatch: [hasRoleGuard],
    canActivate: [authRoleGuardGuard],
    data:{
      allowedRoles: [1]
    },
    loadChildren: () => import('./crear-admin/crear-admin.module').then( m => m.CrearAdminPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
