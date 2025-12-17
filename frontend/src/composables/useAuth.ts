import { User } from "@/interfaces/user_interface";


export function useAuth() {
    let user = {} as User

    function setUser(data: User): void {
        user = data;
    }

    function getUser(): User {
        return user;
    }
}