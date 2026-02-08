import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private apiUrl = 'http://localhost:3000/statuses';

  constructor(private http: HttpClient) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl);
  }
}
