import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
export declare class EventsController {
    private readonly repository;
    private readonly logger;
    constructor(repository: Repository<Event>);
    findAll(): Promise<Event[]>;
    practice(): Promise<Event[]>;
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
    } & Event>;
    remove(id: any): Promise<void>;
}
