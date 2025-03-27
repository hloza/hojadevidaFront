import { Component } from "@angular/core"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import {  Router, RouterLink } from "@angular/router"
import  { AuthService } from "@core/services/auth.service"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {
  registerForm: FormGroup
  loading = false
  submitted = false
  errorMessage = ""

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  get f() {
    return this.registerForm.controls
  }

  onSubmit(): void {
    this.submitted = true
    this.errorMessage = ""

    if (this.registerForm.invalid) {
      return
    }

    this.loading = true
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(["/dashboard"])
      },
      error: (error) => {
        this.errorMessage = error.error?.message || "Registration failed. Please try again."
        this.loading = false
      },
    })
  }
}

