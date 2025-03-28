import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { ExperienceService } from "@core/services/experience.service"
import  { Experience } from "@core/models/experience.model"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-experience",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experienceForm: FormGroup
  experiences: Experience[] = []
  loading = false
  submitted = false
  successMessage = ""
  errorMessage = ""

  constructor(
    private formBuilder: FormBuilder,
    private experienceService: ExperienceService,
  ) {
    this.experienceForm = this.formBuilder.group({
      position: ["", Validators.required],
      title: ["", Validators.required],
      period: ["", Validators.required],
      url: [""],
    })
  }

  ngOnInit(): void {
    this.loadExperiences()
  }

  get f() {
    return this.experienceForm.controls
  }

  loadExperiences(): void {
    this.experienceService.getExperiences().subscribe((data) => {
      this.experiences = data
    })
  }

  onSubmit(): void {
    this.submitted = true
    this.successMessage = ""
    this.errorMessage = ""

    if (this.experienceForm.invalid) {
      return
    }

    this.loading = true
    this.experienceService.addExperience(this.experienceForm.value).subscribe({
      next: () => {
        this.successMessage = "Experience added successfully"
        this.loading = false
        this.submitted = false
        this.experienceForm.reset()
        this.loadExperiences()
      },
      error: (error) => {
        this.errorMessage = error.error?.message || "Failed to add experience"
        this.loading = false
      },
    })
  }

  deleteExperience(id: number): void {
    if (confirm("Are you sure you want to delete this experience entry?")) {
      this.experienceService.deleteExperience(id).subscribe({
        next: () => {
          this.successMessage = "Experience deleted successfully"
          this.loadExperiences()
        },
        error: (error) => {
          this.errorMessage = error.error?.message || "Failed to delete experience"
        },
      })
    }
  }
}

