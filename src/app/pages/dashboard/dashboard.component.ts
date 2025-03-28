import { Component, type OnInit } from "@angular/core"
import { RouterLink } from "@angular/router"
import { CommonModule, NgClass } from "@angular/common"
import  { AuthService } from "@core/services/auth.service"
import  { EducationService } from "@core/services/education.service"
import  { ExperienceService } from "@core/services/experience.service"
import  { SkillsService } from "@core/services/skill.service"
import  { ProjectsService } from "@core/services/project.service"
import  { User } from "@core/models/user.model"
import  { Education } from "@core/models/education.model"
import  { Experience } from "@core/models/experience.model"
import  { Skill } from "@core/models/skill.model"
import  { Project } from "@core/models/project.model"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [RouterLink, NgClass, CommonModule],
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
      console.log(data);
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


