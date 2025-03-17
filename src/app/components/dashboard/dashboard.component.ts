import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthUseCase } from '../../domain/usecases/auth-usecase';
import { IUsuario } from '../../core/interfaces/usuario.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  user: IUsuario | null = null;
  menuItems: MenuItem[] = [];
  
  constructor(
    private authUseCase: AuthUseCase,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authUseCase.obtenerUsuario();
    
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.initMenu();
  }

  initMenu(): void {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/dashboard']
      },
      {
        label: 'Productos',
        icon: 'pi pi-shopping-bag',
        routerLink: ['/productos']
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        routerLink: ['/clientes']
      },
      {
        label: 'Mi Perfil',
        icon: 'pi pi-user',
        routerLink: ['/perfil']
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  logout(): void {
    this.authUseCase.cerrarSesion();
    this.router.navigate(['/login']);
  }
}