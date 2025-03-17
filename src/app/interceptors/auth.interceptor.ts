import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthUseCase } from '../domain/usecases/auth-usecase';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authUseCase: AuthUseCase, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
          const token = this.authUseCase.obtenerToken();
    
    // Si hay un token, añadirlo a las cabeceras de la petición
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    // Continuar con la petición y manejar errores
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el error es 401 (No autorizado), cerrar sesión y redirigir al login
        if (error.status === 401) {
          this.authUseCase.cerrarSesion();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}