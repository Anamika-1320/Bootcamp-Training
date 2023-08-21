import { CreateEventDto } from './input/create-event.dto';
import { UpdateEventDto } from './input/update-event.dto';
import { Repository } from 'typeorm';
import { Attendee } from 'src/events/attendee.entity';
import { Event } from 'src/events/event.entity';
import { EventsService } from './events.service';
import { ListEvents } from './input/list.events';
export declare class EventsController {
    private readonly repository;
    private readonly attendeeRepository;
    private readonly eventsService;
    private readonly logger;
    constructor(repository: Repository<Event>, attendeeRepository: Repository<Attendee>, eventsService: EventsService);
    findAll(filter: ListEvents): Promise<import("../pagination/paginator").PaginationResult<Event>>;
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
        attendeeCount?: Number;
        attendeeAccepted?: Number;
        attendeeMaybe?: Number;
        attendeeRejected?: Number;
    } & Event>;
    remove(id: any): Promise<void>;
}
