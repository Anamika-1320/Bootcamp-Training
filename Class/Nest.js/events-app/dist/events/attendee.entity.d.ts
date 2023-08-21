import { Event } from 'src/events/event.entity';
export declare enum AttendeeAnswerEnum {
    Accepted = 1,
    Maybe = 2,
    Rejected = 3
}
export declare class Attendee {
    id: Number;
    name: string;
    event: Event;
    answer: AttendeeAnswerEnum;
}
