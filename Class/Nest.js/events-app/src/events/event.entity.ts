import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from 'src/events/attendee.entity';
import { User } from "src/auth/user.entity";

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

    @ManyToOne(() => User, (user) => user.organized)
    @JoinColumn({ name: 'organizerId' })
    organizer: User;

    @Column({ nullable: true })
    organizerId: number;

    attendeeCount?: Number;
    attendeeAccepted?: Number;
    attendeeMaybe?: Number;
    attendeeRejected?: Number;
}