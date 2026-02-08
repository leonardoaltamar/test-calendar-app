export interface User {
    id: number;
    email: string;
    password: string;
    admin: boolean;
    token: string;
}