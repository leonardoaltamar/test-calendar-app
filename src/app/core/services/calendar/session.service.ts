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

    getSessions(): Observable<Session[]> {
        return this.http.get<Session[]>(this.apiUrl);
    }
}
