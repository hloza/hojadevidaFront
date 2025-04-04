import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { SkillsService } from "@core/services/skill.service"
import  { Skill } from "@core/models/skill.model"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-skills",
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skillForm: FormGroup
  skills: Skill[] = []
  loading = false
  submitted = false
  successMessage = ""
  errorMessage = ""

  constructor(
    private formBuilder: FormBuilder,
    private skillsService: SkillsService,
  ) {
    this.skillForm = this.formBuilder.group({
      description: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadSkills()
  }

  get f() {
    return this.skillForm.controls
  }

  loadSkills(): void {
    this.skillsService.getSkills().subscribe({
      next: (data) => {
        this.skills = data
      },
      error: (error) => {
        console.error("Error loading skills:", error)
        this.errorMessage = "Failed to load skills data. Please try again."
      },
    })
  }

  onSubmit(): void {
    this.submitted = true
    this.successMessage = ""
    this.errorMessage = ""

    if (this.skillForm.invalid) {
      return
    }

    this.loading = true
    this.skillsService.addSkill(this.skillForm.value).subscribe({
      next: () => {
        this.successMessage = "Skill added successfully"
        this.loading = false
        this.submitted = false
        this.skillForm.reset()
        this.loadSkills()
      },
      error: (error) => {
        console.error("Error adding skill:", error)
        this.errorMessage = error.error?.message || "Failed to add skill"
        this.loading = false
      },
    })
  }

  deleteSkill(id: number): void {
    if (confirm("Are you sure you want to delete this skill?")) {
      this.skillsService.deleteSkill(id).subscribe({
        next: () => {
          this.successMessage = "Skill deleted successfully"
          this.loadSkills()
        },
        error: (error) => {
          console.error("Error deleting skill:", error)
          this.errorMessage = error.error?.message || "Failed to delete skill"
        },
      })
    }
  }
}

