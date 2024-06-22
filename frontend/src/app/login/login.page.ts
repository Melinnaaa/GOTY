import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  formSubmitted = false;
  emailError: string = '';
  passwordError: string = '';
  loginError: string = '';
  
  // Propiedad para controlar la visibilidad del toolbar
  hideToolbar: boolean = true; // Ocultamos el toolbar por defecto en la página de login

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.formSubmitted = true;
    if (!this.validateLogin()) {
      console.error('El formulario no es válido');
      return;
    }

    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        response => {
          console.log('Inicio de sesión exitoso', response);
          this.router.navigate(['/principal']); // Redirigir a la página principal
        },
        error => {
          console.error('Error en el inicio de sesión', error);
          this.loginError = 'El correo y la contraseña no coinciden.';
        }
      );
    } else {
      console.error('Formulario no válido');
    }
  }

  validateLogin(): boolean {
    let isValid = true;
    // Valida el correo electrónico
    if (!this.validateEmail()) {
      this.emailError = 'Correo inválido. Por favor, intenta nuevamente.';
      isValid = false;
    } else {
      this.emailError = '';
    }
    if (this.password.trim() === '') {
      this.passwordError = 'La contraseña no puede estar vacía.';
      isValid = false;
    }
    return isValid;
  }

  // Valida el email
  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(this.email);
  }

  // Función para manejar la navegación hacia atrás
  goBack() {
    this.router.navigate(['/']); // Redirigir a la página anterior o la principal según sea necesario
  }
}
