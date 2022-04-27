import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDTO, UserSO } from './user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    login: (data: UserDTO) => Promise<UserSO>;
    register: (data: UserDTO) => Promise<UserSO>;
    getProfile: (email: string) => Promise<any>;
}
