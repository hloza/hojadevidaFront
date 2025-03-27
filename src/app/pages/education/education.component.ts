import { Component, type OnInit } from "@angular/core"
import {  FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { EducationService } from "@core/services/education.service"
import type { Education } from "@core/models/education.model"

@Component({
  selector: "app-education",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent  implements OnInit {
  educationForm: FormGroup
  education: Education[] = []
  loading = false
  submitted = false
  successMessage = ""
  errorMessage = ""

  constructor(
    private formBuilder: FormBuilder,
    private educationService: EducationService,
  ) {
    this.educationForm = this.formBuilder.group({
      institution: ["", Validators.required],
      title: ["", Validators.required],
      finish: [true],
    })
  }

  ngOnInit(): void {
    this.loadEducation()
  }

  get f() {
    return this.educationForm.controls
  }

  loadEducation(): void {
    this.educationService.getEducation().subscribe((data) => {
      this.education = data
    })
  }

  onSubmit(): void {
    this.submitted = true
    this.successMessage = ""
    this.errorMessage = ""

    if (this.educationForm.invalid) {
      return
    }

    this.loading = true
    this.educationService.addEducation(this.educationForm.value).subscribe({
      next: () => {
        this.successMessage = "Education added successfully"
        this.loading = false
        this.submitted = false
        this.educationForm.reset({ finish: true })
        this.loadEducation()
      },
      error: (error) => {
        this.errorMessage = error.error?.message || "Failed to add education"
        this.loading = false
      },
    })
  }

  deleteEducation(id: number): void {
    if (confirm("Are you sure you want to delete this education entry?")) {
      this.educationService.deleteEducation(id).subscribe({
        next: () => {
          this.successMessage = "Education deleted successfully"
          this.loadEducation()
        },
        error: (error) => {
          this.errorMessage = error.error?.message || "Failed to delete education"
        },
      })
    }
  }
}

