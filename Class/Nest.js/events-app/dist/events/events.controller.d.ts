import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Repository } from 'typeorm';
import { Attendee } from 'src/events/attendee.entity';
import { Event } from 'src/events/event.entity';
export declare class EventsController {
    private readonly repository;
    private readonly attendeeRepository;
    private readonly logger;
    constructor(repository: Repository<Event>, attendeeRepository: Repository<Attendee>);
    findAll(): Promise<Event[]>;
    practice(): Promise<Event[]>;
    practice2(): Promise<Event>;
    findOne(id: number): Promise<Event>;
    create(input: CreateEventDto): Promise<{
        when: Date;
        name: string;
        description: string;
        address: string;
    } & Event>;
    update(id: any, input: UpdateEventDto): Promise<{
        when: Date;
        name: string;
        description: string;
        address: string;
        id: Number;
        attendees: Attendee[];
    } & Event>;
    remove(id: any): Promise<void>;
}
