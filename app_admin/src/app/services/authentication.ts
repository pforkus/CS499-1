import { Inject, Injectable, signal } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { Users } from '../services/users';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Authentication {

    private loggedInSignal = signal<boolean>(false);
    public isLoggedIn = this.loggedInSignal.asReadonly();

    constructor(
        @Inject(BROWSER_STORAGE) private storage: Storage,
        private users: Users
    ) {
        this.loggedInSignal.set(this.hasValidToken());
    }

    public getToken(): string {
        return this.storage.getItem('auth-token') || '';
    }

    public saveToken(token: string): void {
        this.storage.setItem('auth-token', token);
        this.loggedInSignal.set(true);
    }

    public logout(): void {
        this.storage.removeItem('auth-token');
        this.loggedInSignal.set(false);
    }

    public login(
        username: string,
        password: string,
        onSuccess: () => void,
        onError: (msg: string) => void
    ): void {
        this.users.login(username, password).subscribe({
            next: (res) => {
                this.saveToken(res.token);
                onSuccess();
            },
            error: (err: HttpErrorResponse) => {
                onError(err.error?.message ?? 'Login failed');
            }
        });
    }

    private hasValidToken(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > (Date.now() / 1000);
        } catch {
            return false;
        }
    }
}