import { Component, type OnInit } from "@angular/core"
import {  FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { ProjectsService } from "@core/services/project.service"
import type { Project } from "@core/models/project.model"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projectForm: FormGroup
  projects: Project[] = []
  loading = false
  submitted = false
  successMessage = ""
  errorMessage = ""

  constructor(
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
  ) {
    this.projectForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      period: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadProjects()
  }

  get f() {
    return this.projectForm.controls
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data
    })
  }

  onSubmit(): void {
    this.submitted = true
    this.successMessage = ""
    this.errorMessage = ""

    if (this.projectForm.invalid) {
      return
    }

    this.loading = true
    this.projectsService.addProject(this.projectForm.value).subscribe({
      next: () => {
        this.successMessage = "Project added successfully"
        this.loading = false
        this.submitted = false
        this.projectForm.reset()
        this.loadProjects()
      },
      error: (error) => {
        this.errorMessage = error.error?.message || "Failed to add project"
        this.loading = false
      },
    })
  }

  deleteProject(id: number): void {
    if (confirm("Are you sure you want to delete this project?")) {
      this.projectsService.deleteProject(id).subscribe({
        next: () => {
          this.successMessage = "Project deleted successfully"
          this.loadProjects()
        },
        error: (error) => {
          this.errorMessage = error.error?.message || "Failed to delete project"
        },
      })
    }
  }
}

