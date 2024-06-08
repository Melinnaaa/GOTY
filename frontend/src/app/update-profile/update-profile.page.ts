import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Ajusta la ruta según tu estructura
import { User } from '../interfaces/users'; // Ajusta la ruta

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  userId: string | null = localStorage.getItem('rut');
  user: User = { Rut: '', Nombre: '', Correo: '', Contrasena: '', role: 0 }; 
  message: string = '';
  
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUser();
  }
  
  getUser() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        data => {
          this.user = data;
        },
        error => {
          this.message = 'Error al obtener el usuario.';
          console.error('Error fetching user data', error);
        }
      );
    } else {
      this.message = 'No se encontró el ID del usuario en el almacenamiento local.';
    }
  }
  
  updateUser() {
    if (this.userId) {
      this.userService.updateUserById(this.userId, this.user).subscribe(
        response => {
          this.message = 'Usuario actualizado correctamente.';
          localStorage.setItem ('email', this.user.Correo.toString());
          localStorage.setItem('userName', this.user.Nombre.toString());
        },
        error => {
          this.message = 'Error al actualizar el usuario.';
          console.error('Error updating user', error);
        }
      );
    } else {
      this.message = 'No se encontró el ID del usuario en el almacenamiento local.';
    }
  }
}
