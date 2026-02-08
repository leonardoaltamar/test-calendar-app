import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

    private apiUrl = 'http://localhost:3000/sessions';

    constructor(private http: HttpClient) {}

    createSession(session: Session): Observable<Session> {
        return this.http.post<Session>(this.apiUrl, session);
    }

    updateSession(id: string, session: Session): Observable<Session> {
        return this.http.put<Session>(`${this.apiUrl}/${id}`, session);
    }

    deleteSession(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getSessions(): Observable<Session[]> {
        return this.http.get<Session[]>(this.apiUrl);
    }
}
