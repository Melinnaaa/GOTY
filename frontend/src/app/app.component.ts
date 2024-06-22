import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute  } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mostrarFooter: boolean;
  mostrarBoton: boolean;

  constructor(private router: Router, private location: Location, private route: ActivatedRoute) {
    this.mostrarFooter = this.getCookie('mostrarFooter') !== 'false';
    this.mostrarBoton = this.getCookie('mostrarBoton') !== 'false';
 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects || event.url;
        console.log('Navigated to:', currentUrl);

        this.mostrarFooter = !['/login', '/register', '/home'].includes(currentUrl);
        this.mostrarBoton = !['/principal', '/home'].includes(currentUrl);

        document.cookie = `mostrarFooter=${this.mostrarFooter}; path=/`;
        document.cookie = `mostrarBoton=${this.mostrarBoton}; path=/`;

        console.log('Updated mostrarFooter:', this.mostrarFooter);
        console.log('Updated mostrarBoton:', this.mostrarBoton);
      }
    });
  }

  goBack() {
    const currentUrl = this.router.url;
    if (currentUrl === '/login' || currentUrl === '/register') {
      this.router.navigate(['/home']);
    }
    if (currentUrl === '/solicitud' || currentUrl === '/ver-solicitudes' || currentUrl === '/reservar-recurso' || currentUrl === '/reservas'|| currentUrl === '/ver-horarios'|| currentUrl === '/admin') {
      this.router.navigate(['/principal']);
    }
    if (currentUrl === '/see-users' || currentUrl === '/update-user' || currentUrl === '/search' || currentUrl === '/delete-user'|| currentUrl === '/crear-admin'|| currentUrl === '/admin-solicitudes'|| currentUrl === '/admin-recursos'|| currentUrl === '/horario') {
      this.router.navigate(['/admin']);
    }
    if (currentUrl === '/account') {
      this.router.navigate(['/principal']);
    }
    if (currentUrl === '/update-profile') {
      this.router.navigate(['/account']);
    }
    if (currentUrl.startsWith('/editar-turno/')) {
      this.router.navigate(['/horario']);
    }
  }

  private getCookie(name: string): string {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return '';
  }
}