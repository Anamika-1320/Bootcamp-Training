import { Profile } from "./profile.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    profile: Profile;
}
