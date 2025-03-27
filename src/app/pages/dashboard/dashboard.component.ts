import { Component, type OnInit } from "@angular/core"
import { RouterLink } from "@angular/router"
import { NgClass } from "@angular/common"
import type { AuthService } from "@core/services/auth.service"
import type { EducationService } from "@core/services/education.service"
import type { ExperienceService } from "@core/services/experience.service"
import type { SkillsService } from "@core/services/skills.service"
import type { ProjectsService } from "@core/services/projects.service"
import type { User } from "@core/models/user.model"
import type { Education } from "@core/models/education.model"
import type { Experience } from "@core/models/experience.model"
import type { Skill } from "@core/models/skill.model"
import type { Project } from "@core/models/project.model"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: User | null = null
  education: Education[] = []
  experiences: Experience[] = []
  skills: Skill[] = []
  projects: Project[] = []

  get educationCount(): number {
    return this.education.length
  }

  get experienceCount(): number {
    return this.experiences.length
  }

  get skillsCount(): number {
    return this.skills.length
  }

  get projectsCount(): number {
    return this.projects.length
  }

  constructor(
    private authService: AuthService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private skillsService: SkillsService,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user
    })

    this.loadData()
  }

  loadData(): void {
    this.educationService.getEducation().subscribe((data) => {
      this.education = data
    })

    this.experienceService.getExperiences().subscribe((data) => {
      this.experiences = data
    })

    this.skillsService.getSkills().subscribe((data) => {
      this.skills = data
    })

    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data
    })
  }
}


