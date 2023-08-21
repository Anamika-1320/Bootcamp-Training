import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from 'src/events/attendee.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    when: Date;

    @Column()
    address: string;

    @OneToMany(() => Attendee, (attendee) => attendee.event, { cascade: true }
        // { eager: true }
    )
    attendees: Attendee[];

    attendeeCount?: Number;
    attendeeAccepted?: Number;
    attendeeMaybe?: Number;
    attendeeRejected?: Number;
}