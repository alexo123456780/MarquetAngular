import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Services & Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthRepository } from './data/repositories/auth-repository';
import { AuthDataSource } from './data/datasources/auth-datasource';
import { AuthUseCase } from './domain/usecases/auth-usecase';
import { AUTH_REPOSITORY } from './domain/repositories/auth-repository.token';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // PrimeNG Modules
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    MenuModule,
    AvatarModule,
    CheckboxModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    MessageService,
    { provide: AUTH_REPOSITORY, useClass: AuthRepository },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
