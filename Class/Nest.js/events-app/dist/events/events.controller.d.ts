import { CreateEventDto } from './input/create-event.dto';
import { UpdateEventDto } from './input/update-event.dto';
import { Event } from 'src/events/event.entity';
import { EventsService } from './events.service';
import { ListEvents } from './input/list.events';
import { User } from 'src/auth/user.entity';
export declare class EventsController {
    private readonly eventsService;
    private readonly logger;
    constructor(eventsService: EventsService);
    findAll(filter: ListEvents): Promise<import("../pagination/paginator").PaginationResult<Event>>;
    findOne(id: number): Promise<Event>;
    create(input: CreateEventDto, user: User): Promise<Event>;
    update(id: any, input: UpdateEventDto, user: User): Promise<Event>;
    remove(id: any, user: User): Promise<void>;
}
