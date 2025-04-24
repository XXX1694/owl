import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './app/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideRouter(routes),
  ],
});
