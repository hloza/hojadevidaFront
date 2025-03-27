import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "@environments/environment"
import type { Skill } from "../models/skill.model"

@Injectable({
  providedIn: "root",
})
export class SkillsService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/api/skill/`)
  }

  addSkill(skill: Partial<Skill>): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}/api/skills/`, skill)
  }

  updateSkill(id: number, skill: Partial<Skill>): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/api/skill/${id}`, skill)
  }

  deleteSkill(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/skill/${id}`)
  }
}

