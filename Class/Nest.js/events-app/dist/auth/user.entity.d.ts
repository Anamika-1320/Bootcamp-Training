import { Profile } from "./profile.entity";
import { Event } from "src/events/event.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    profile: Profile;
    organized: Event[];
}
