import { Attendee } from 'src/events/attendee.entity';
import { User } from "src/auth/user.entity";
export declare class Event {
    id: Number;
    name: string;
    description: string;
    when: Date;
    address: string;
    attendees: Attendee[];
    organizer: User;
    organizerId: number;
    attendeeCount?: Number;
    attendeeAccepted?: Number;
    attendeeMaybe?: Number;
    attendeeRejected?: Number;
}
