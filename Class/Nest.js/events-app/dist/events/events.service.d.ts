import { Event } from 'src/events/event.entity';
import { Attendee } from 'src/events/attendee.entity';
import { DeleteResult, Repository } from "typeorm";
import { ListEvents } from './input/list.events';
import { PaginateOptions } from '../pagination/paginator';
import { CreateEventDto } from "./input/create-event.dto";
import { User } from "src/auth/user.entity";
import { UpdateEventDto } from "./input/update-event.dto";
export declare class EventsService {
    private readonly eventsRepository;
    private readonly attendeeRepository;
    private readonly logger;
    constructor(eventsRepository: Repository<Event>, attendeeRepository: Repository<Attendee>);
    private getEventsBaseQuery;
    getEventsWithAttendeeCountQuery(): import("typeorm").SelectQueryBuilder<Event>;
    private getEventsWithAttendeeCountFiltered;
    getEventsWithAttendeeCountFilteredPaginated(filter: ListEvents, paginateOptions: PaginateOptions): Promise<import("../pagination/paginator").PaginationResult<Event>>;
    getEvent(id: number): Promise<Event> | undefined;
    createEvent(input: CreateEventDto, user: User): Promise<Event>;
    updateEvent(input: UpdateEventDto, event: Event): Promise<Event>;
    deleteEvent(id: number): Promise<DeleteResult>;
}
