import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userName: string | null = '';
  userRole: string = '';
  email: string | null = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Esto hace que se ejecute la pagina siempre al entrar, de esta manera si hay cambios estos se ven reflejados.
  ionViewWillEnter() {
    this.loadUserData();
  }

  loadUserData() {
    this.userName = localStorage.getItem('userName');
    this.userRole = this.getRoleLabel(this.authService.getRole());
    this.email = localStorage.getItem('email');
  }

  getRoleLabel(role: number): string {
    return role === 1 ? 'Administrador' : 'Empleado';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
