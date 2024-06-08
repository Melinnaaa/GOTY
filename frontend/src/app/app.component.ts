import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mostrarFooter: boolean;
  mostrarBoton: boolean;
  private navigationHistory: string[][] = [[]];

  constructor(private router: Router, private location: Location) {
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

        this.addToHistory(currentUrl);
      }
    });
  }

  addToHistory(url: string) {
    const currentLevel = this.navigationHistory.length - 1;
    this.navigationHistory[currentLevel].push(url);
  
    // Si la página actual se redirigió, elimina la URL anterior de la pila
    if (this.navigationHistory[currentLevel].length > 1) {
      this.navigationHistory[currentLevel].pop();
    }
  }
  

  removeFromHistory() {
    const currentLevel = this.navigationHistory.length - 1;
    this.navigationHistory[currentLevel].pop();
  }

  getPreviousUrl(): string {
    const currentLevel = this.navigationHistory.length - 1;
    if (this.navigationHistory[currentLevel].length > 1) {
      this.navigationHistory[currentLevel].pop(); // Elimina la última página actual
      return this.navigationHistory[currentLevel].pop() || '/'; // Retorna la página anterior o la raíz si no hay una anterior
    } else if (this.navigationHistory.length > 1) {
      // Si no hay más páginas en este nivel, retrocede al nivel anterior
      this.navigationHistory.pop();
      const prevLevel = this.navigationHistory.length - 1;
      return this.navigationHistory[prevLevel].pop() || '/';
    } else {
      return '/';
    }
  }

  pushNavigationLevel() {
    this.navigationHistory.push([]);
  }

  popNavigationLevel() {
    this.navigationHistory.pop();
  }

  goBack() {
    const previousUrl = this.getPreviousUrl();
    this.router.navigateByUrl(previousUrl);
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
