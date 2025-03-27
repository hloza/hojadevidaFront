import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "@environments/environment"
import type { Experience } from "../models/experience.model"

@Injectable({
  providedIn: "root",
})
export class ExperienceService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/api/experience/`)
  }

  addExperience(experience: Partial<Experience>): Observable<Experience> {
    return this.http.post<Experience>(`${this.apiUrl}/api/experience/`, experience)
  }

  deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/experience/${id}`)
  }
}

