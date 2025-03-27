import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "@environments/environment"
import type { Education } from "../models/education.model"

@Injectable({
  providedIn: "root",
})
export class EducationService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiUrl}/api/education/user`)
  }

  addEducation(education: Partial<Education>): Observable<Education> {
    return this.http.post<Education>(`${this.apiUrl}/api/education/`, education)
  }

  deleteEducation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/education/${id}`)
  }
}

