import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "@environments/environment"
import type { Project } from "../models/project.model"

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/api/project/`)
  }

  addProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/api/project/`, project)
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/project/${id}`)
  }
}

