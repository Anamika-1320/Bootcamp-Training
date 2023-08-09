export declare class EventsController {
    findAll(): {
        id: number;
        name: string;
    }[];
    findOne(id: any): {
        id: number;
        name: string;
    };
    create(input: any): any;
    update(id: any, input: any): any;
    remove(id: any): void;
}
