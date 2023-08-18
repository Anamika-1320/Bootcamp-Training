import { Attendee } from 'src/events/attendee.entity';
export declare class Event {
    id: Number;
    name: string;
    description: string;
    when: Date;
    address: string;
    attendees: Attendee[];
}
