import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.page.html',
  styleUrls: ['./crear-admin.page.scss'],
})
export class CrearAdminPage {
  rut: string = '';
  correo: string = '';
  contrasena: string = '';
  nombre: string = '';

  constructor(private userService: UserService, private router: Router) {}

  crearAdmin() {
    const nuevoAdmin = {
      Rut: this.rut,
      Correo: this.correo,
      Contraseña: this.contrasena,
      Nombre: this.nombre
    };

    this.userService.crearAdmin(nuevoAdmin).subscribe(
      (response) => {
        alert('Administrador creado exitosamente');
        this.router.navigate(['/admin']);  // Redirige a la página de administración o a otra página adecuada
      },
      (error) => {
        console.error('Error al crear el administrador:', error);
        alert('Error al crear el administrador');
      }
    );
  }
}
