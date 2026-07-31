import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class Users {
    private url = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) { }

    //login
    login(username: string, password: string) {
        return this.http.post<{ token: string }>(`${this.url}/login`, { username, password });
    }

    //register?

}
