export interface User {
    JWT: string;
    username: string;
    email: string;
    avatar_url: string | null;
    created_at: Date;
}