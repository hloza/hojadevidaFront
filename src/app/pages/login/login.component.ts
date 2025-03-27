import { Component } from "@angular/core"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import {  Router, RouterLink } from "@angular/router"
import  { AuthService } from "@core/services/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup
  loading = false
  submitted = false
  errorMessage = ""

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })
  }

  get f() {
    return this.loginForm.controls
  }

  onSubmit(): void {
    this.submitted = true
    this.errorMessage = ""

    if (this.loginForm.invalid) {
      return
    }

    this.loading = true
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(["/dashboard"])
      },
      error: (error) => {
        this.errorMessage = error.error?.message || "Login failed. Please check your credentials."
        this.loading = false
      },
    })
  }
}

