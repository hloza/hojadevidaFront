import type { Routes } from "@angular/router"
import { authGuard } from "@core/guard/auth.guard"

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "login",
    loadComponent: () => import("./pages/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () => import("./pages/register/register.component").then((m) => m.RegisterComponent),
  },
  {
    path: "dashboard",
    loadComponent: () => import("./pages/dashboard/dashboard.component").then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: "profile",
    loadComponent: () => import("./pages/profile/profile.component").then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: "education",
    loadComponent: () => import("./pages/education/education.component").then((m) => m.EducationComponent),
    canActivate: [authGuard],
  },
  {
    path: "experience",
    loadComponent: () => import("./pages/experience/experience.component").then((m) => m.ExperienceComponent),
    canActivate: [authGuard],
  },
  {
    path: "skills",
    loadComponent: () => import("./pages/skills/skills.component").then((m) => m.SkillsComponent),
    canActivate: [authGuard],
  },
  {
    path: "**",
    redirectTo: "",
  },
]

