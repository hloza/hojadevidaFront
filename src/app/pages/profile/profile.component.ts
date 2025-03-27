import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from "@core/services/auth.service"
import type { User } from "@core/models/user.model"

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup
  user: User | null = null
  loading = false
  submitted = false
  successMessage = ""
  errorMessage = ""

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.initForm() // Initialize form in constructor
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user
        this.updateFormValues(user)
      }
    })

    if (!this.user) {
      this.authService.fetchUserProfile().subscribe()
    }
  }

  private initForm(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
    })
  }

  private updateFormValues(user: User): void {
    this.profileForm.patchValue({
      name: user.name,
      email: user.email
    })
  }

  get f() {
    return this.profileForm.controls
  }

  onSubmit(): void {
    this.submitted = true
    this.successMessage = ""
    this.errorMessage = ""

    if (this.profileForm.invalid) {
      return
    }

    this.loading = true
    this.authService.updateProfile({ name: this.profileForm.value.name }).subscribe({
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