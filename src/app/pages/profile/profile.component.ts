import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import type { AuthService } from "@core/services/auth.service"
import type { User } from "@core/models/user.model"

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup | null = null
  user: User | null = null
  loading = false
  submitted = false
  successMessage = ""
  errorMessage = ""

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user
        this.initForm()
      }
    })

    if (!this.user) {
      this.authService.fetchUserProfile().subscribe()
    }
  }

  initForm(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user?.name, Validators.required],
      email: [{ value: this.user?.email, disabled: true }],
    })
  }

  get f() {
    return this.profileForm?.controls || {}
  }

  onSubmit(): void {
    this.submitted = true
    this.successMessage = ""
    this.errorMessage = ""

    if (this.profileForm?.invalid) {
      return
    }

    this.loading = true
    this.authService.updateProfile({ name: this.profileForm?.value.name }).subscribe({
      next: () => {
        this.successMessage = "Profile updated successfully"
        this.loading = false
      },
      error: (error) => {
        this.errorMessage = error.error?.message || "Failed to update profile"
        this.loading = false
      },
    })
  }
}

