import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
export declare class UserService {
    private readonly repository;
    getUser(id: number): Promise<User | null>;
    createUser(body: CreateUserDto): Promise<User>;
}
