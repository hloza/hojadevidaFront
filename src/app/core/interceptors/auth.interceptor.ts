import { Injectable } from "@angular/core"
import type { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http"
import type { Observable } from "rxjs"
import type { AuthService } from "../services/auth.service"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken()

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    }

    return next.handle(request)
  }
}

