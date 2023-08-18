import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';
export declare class TrainingController {
    private readonly subjectRepository;
    private readonly teacherRepository;
    constructor(subjectRepository: Repository<Subject>, teacherRepository: Repository<Teacher>);
    savingRelation(): Promise<void>;
    removingRelation(): Promise<void>;
}
