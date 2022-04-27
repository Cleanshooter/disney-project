import { TodoEntity } from 'src/todo/todo.entity';
import { UserSO } from './user.dto';
export declare class UserEntity {
    id: string;
    email: string;
    password: string;
    createdOn: Date;
    hashPassword: () => Promise<void>;
    todos: TodoEntity[];
    comparePassword: (attempt: string) => Promise<boolean>;
    sanitizeObject: (options?: SanitizeUserOptions) => UserSO;
    private get token();
}
declare type SanitizeUserOptions = {
    withToken?: boolean;
};
export {};
