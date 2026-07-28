import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Users {
    private url = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) { }

    //login
    login(username: string, password: string) {
        return this.http.post<{ token: string }>(`${this.url}/login`, { username, password });
    }

    //register?

}
