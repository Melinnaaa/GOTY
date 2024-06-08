import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/users';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})

export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  rut: string = '';
  acceptsTerms: boolean = false;
  formSubmitted = false;
  recaptchaService = inject(ReCaptchaV3Service);

  emailError: string = '';
  rutError: string = '';
  passwordError: string = '';

  captchaToken: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    // No es necesario cargar regiones o comunas
  }

  excecuteRecaptcha() {
    this.recaptchaService.execute('register').subscribe((token) => {
      this.captchaToken = token;
      console.log(this.captchaToken);
      this.submitForm();  // Envía el formulario después de obtener el token
    }, (error) => {
      console.error('Error al ejecutar reCAPTCHA', error);
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (!this.validateForm()) {
      console.error('El formulario no es valido');
      return;
    }
    this.excecuteRecaptcha();  // Ejecuta reCAPTCHA y luego envía el formulario
  }

  submitForm() {
    // Procesar los datos del formulario, por ejemplo enviar a un servidor
    const user: User = {
      Correo: this.email,
      Nombre: this.username,
      Contrasena: this.password,
      Rut: this.rut,
      role: 0 // Establecer el rol a 0 para empleados
    };

    this.userService.saveUser(user, this.captchaToken).subscribe(() => {
      console.log('Usuario Registrado');
      this.router.navigate(['/principal']);
    }, error => {
      console.error('Error al registrar el usuario', error);
    });
  }

  validateForm(): boolean {
    let isValid = true;

    // Valida el correo electrónico
    if (!this.validateEmail()) {
      this.emailError = 'Correo invalido.';
      isValid = false;
    } else {
      this.emailError = '';
    }

    // Valida el RUT
    if (!this.validateRut(this.rut)) {
      this.rutError = 'RUT inválido';
      isValid = false;
    } else {
      this.rutError = '';
    }

    // Valida que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.passwordError = 'Las contraseñas no coinciden.';
      isValid = false;
    } else if (!this.password || this.password.trim() === '') {
      this.passwordError = 'Las contraseña no puede estar vacia.';
      isValid = false;
    } else {
      this.passwordError = '';
    }

    return isValid;
  }

  // Valida el rut
  validateRut(rut: string): boolean {
    const rutClean = rut.replace(/[\.\-]/g, '');
    let rutDigits = rutClean.slice(0, -1);
    let verifier = rutClean.slice(-1).toUpperCase();

    let t = parseInt(rutDigits, 10);
    let m = 0;
    let s = 1;
    while (t > 0) {
      s = (s + (t % 10) * (9 - m++ % 6)) % 11;
      t = Math.floor(t / 10);
    }
    const checkDigit = (s > 0) ? (s - 1).toString() : 'K';
    return verifier === checkDigit;
  }

  // Valida el email
  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(this.email);
  }
}
